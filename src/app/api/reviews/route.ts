import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc, eq, ilike, or, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const source = searchParams.get("source") || "all";

    // Build the where conditions
    let conditions = [eq(reviews.userId, session.user.id)];

    if (search) {
      conditions.push(
        sql`(${reviews.authorName} ILIKE ${`%${search}%`} OR ${
          reviews.content
        } ILIKE ${`%${search}%`})`
      );
    }

    if (status !== "all") {
      conditions.push(eq(reviews.status, status as "pending" | "approved" | "rejected"));
    }

    if (source !== "all") {
      conditions.push(eq(reviews.source, source as "direct" | "api" | "widget"));
    }

    const results = await db
      .select()
      .from(reviews)
      .where(and(...conditions))
      .orderBy(desc(reviews.createdAt));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
