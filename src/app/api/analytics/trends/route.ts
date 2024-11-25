import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, apiUsage } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "daily";

    const interval = period === "monthly" ? "month" : "day";
    const lookback = period === "monthly" ? "6 months" : "30 days";

    const trends = await db
      .select({
        date: sql<string>`to_char(date_trunc('${sql.raw(interval)}', ${
          reviews.createdAt
        }), 'YYYY-MM-DD')`,
        reviews: sql<number>`count(*)::int`,
      })
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, session.user.id),
          sql`${reviews.createdAt} > now() - interval '${sql.raw(lookback)}'`
        )
      )
      .groupBy(sql`date_trunc('${sql.raw(interval)}', ${reviews.createdAt})`)
      .orderBy(sql`date_trunc('${sql.raw(interval)}', ${reviews.createdAt})`);

    const apiCalls = await db
      .select({
        date: sql<string>`to_char(date_trunc('${sql.raw(interval)}', ${
          apiUsage.timestamp
        }), 'YYYY-MM-DD')`,
        apiCalls: sql<number>`count(*)::int`,
      })
      .from(apiUsage)
      .where(
        and(
          eq(apiUsage.userId, session.user.id),
          sql`${apiUsage.timestamp} > now() - interval '${sql.raw(lookback)}'`
        )
      )
      .groupBy(sql`date_trunc('${sql.raw(interval)}', ${apiUsage.timestamp})`)
      .orderBy(sql`date_trunc('${sql.raw(interval)}', ${apiUsage.timestamp})`);

    // Combine the results
    const data = trends.map((trend) => {
      const apiData = apiCalls.find((api) => api.date === trend.date);
      return {
        date: trend.date,
        reviews: trend.reviews,
        apiCalls: apiData?.apiCalls || 0,
      };
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching trends:", error);
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
