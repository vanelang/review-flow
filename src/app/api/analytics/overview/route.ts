import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, apiUsage } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total reviews and average rating
    const reviewStats = await db
      .select({
        totalReviews: sql<number>`count(*)::int`,
        averageRating: sql<number>`round(avg(${reviews.rating})::numeric, 1)`,
      })
      .from(reviews)
      .where(eq(reviews.userId, session.user.id));

    // Get reviews by source
    const reviewsBySource = await db
      .select({
        source: reviews.source,
        count: sql<number>`count(*)::int`,
      })
      .from(reviews)
      .where(eq(reviews.userId, session.user.id))
      .groupBy(reviews.source);

    // Get API usage
    const apiStats = await db
      .select({
        current: sql<number>`count(*)::int`,
      })
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.userId, session.user.id),
          sql`${apiUsage.timestamp} > now() - interval '30 days'`
        )
      );

    const sourceMap = reviewsBySource.reduce((acc, { source, count }) => {
      acc[source] = count;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      data: {
        totalReviews: reviewStats[0].totalReviews,
        averageRating: reviewStats[0].averageRating || 0,
        reviewsBySource: {
          api: sourceMap.api || 0,
          widget: sourceMap.widget || 0,
          direct: sourceMap.direct || 0,
        },
        apiUsage: {
          current: apiStats[0].current,
          limit: 10000, // This should come from user's plan
        },
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
