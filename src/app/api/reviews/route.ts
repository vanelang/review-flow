import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, widgets } from "@/db/schema";
import { desc, eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createReviewSchema = z.object({
  widgetId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string(),
  authorName: z.string(),
  authorEmail: z.string().email().optional(),
  authorConsent: z.boolean(),
  source: z.enum(["direct", "api", "widget"]).default("api"),
  metadata: z.record(z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const result = createReviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: result.error.errors[0].message,
          },
        },
        { status: 400 }
      );
    }

    // Verify widget ownership
    const widget = await db.query.widgets.findFirst({
      where: and(eq(widgets.id, result.data.widgetId), eq(widgets.userId, session.user.id)),
    });

    if (!widget) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_WIDGET",
            message: "Widget not found or unauthorized",
          },
        },
        { status: 404 }
      );
    }

    const [review] = await db
      .insert(reviews)
      .values({
        ...result.data,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
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

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let conditions = [eq(reviews.userId, session.user.id)];

    if (status) {
      conditions.push(eq(reviews.status, status as "pending" | "approved" | "rejected"));
    }

    if (source) {
      conditions.push(eq(reviews.source, source as "direct" | "api" | "widget"));
    }

    const results = await db
      .select()
      .from(reviews)
      .where(and(...conditions))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const total = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(reviews)
      .where(and(...conditions));

    return NextResponse.json({
      success: true,
      data: {
        reviews: results,
        pagination: {
          total: total[0].count,
          page,
          limit,
          pages: Math.ceil(total[0].count / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
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
