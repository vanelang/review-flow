import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, widgets, apiUsage } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total reviews count and growth
    const reviewStats = await db
      .select({
        total: sql<number>`count(*)::int`,
        recent: sql<number>`
          count(case when ${reviews.createdAt} > now() - interval '30 days' then 1 end)::int
        `,
        previous: sql<number>`
          count(case when ${reviews.createdAt} between now() - interval '60 days' and now() - interval '30 days' then 1 end)::int
        `,
      })
      .from(reviews)
      .where(eq(reviews.userId, session.user.id));

    // Get API usage stats
    const apiStats = await db
      .select({
        total: sql<number>`count(*)::int`,
        success: sql<number>`
          count(case when ${apiUsage.statusCode} < 400 then 1 end)::int
        `,
      })
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.userId, session.user.id),
          sql`${apiUsage.timestamp} > now() - interval '30 days'`
        )
      );

    // Get active widgets count
    const widgetStats = await db
      .select({
        total: sql<number>`count(*)::int`,
        active: sql<number>`
          count(case when ${widgets.isActive} = true then 1 end)::int
        `,
      })
      .from(widgets)
      .where(eq(widgets.userId, session.user.id));

    // Get average rating
    const ratingStats = await db
      .select({
        avgRating: sql<number>`round(avg(${reviews.rating})::numeric, 1)`,
      })
      .from(reviews)
      .where(eq(reviews.userId, session.user.id));

    // Fixed review trends query
    const reviewTrends = await db
      .select({
        date: sql<string>`to_char(date_trunc('month', ${reviews.createdAt}), 'Mon')`,
        month: sql<string>`date_trunc('month', ${reviews.createdAt})`,
        reviews: sql<number>`count(*)::int`,
      })
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, session.user.id),
          sql`${reviews.createdAt} > now() - interval '6 months'`
        )
      )
      .groupBy(sql`date_trunc('month', ${reviews.createdAt})`)
      .orderBy(sql`date_trunc('month', ${reviews.createdAt})`);

    // Separate API calls query
    const apiCalls = await db
      .select({
        month: sql<string>`date_trunc('month', ${apiUsage.timestamp})`,
        apiCalls: sql<number>`count(*)::int`,
      })
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.userId, session.user.id),
          sql`${apiUsage.timestamp} > now() - interval '6 months'`
        )
      )
      .groupBy(sql`date_trunc('month', ${apiUsage.timestamp})`)
      .orderBy(sql`date_trunc('month', ${apiUsage.timestamp})`);

    // Combine the results
    const chartData = reviewTrends.map((trend) => {
      const apiData = apiCalls.find((api) => api.month === trend.month);
      return {
        date: trend.date,
        reviews: trend.reviews,
        apiCalls: apiData?.apiCalls || 0,
      };
    });

    // Get recent reviews
    const recentReviews = await db
      .select({
        id: reviews.id,
        authorName: reviews.authorName,
        rating: reviews.rating,
        content: reviews.content,
        createdAt: reviews.createdAt,
        source: reviews.source,
      })
      .from(reviews)
      .where(eq(reviews.userId, session.user.id))
      .orderBy(sql`${reviews.createdAt} desc`)
      .limit(3);

    return NextResponse.json({
      stats: {
        reviews: {
          total: reviewStats[0].total,
          growth: reviewStats[0].previous
            ? Math.round(
                ((reviewStats[0].recent - reviewStats[0].previous) / reviewStats[0].previous) * 100
              )
            : 0,
        },
        apiUsage: {
          total: apiStats[0].total,
          successRate: apiStats[0].total
            ? Math.round((apiStats[0].success / apiStats[0].total) * 100)
            : 100,
        },
        widgets: {
          total: widgetStats[0].total,
          active: widgetStats[0].active,
        },
        avgRating: ratingStats[0].avgRating || 0,
      },
      chartData,
      recentReviews,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
