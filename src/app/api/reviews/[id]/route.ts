import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";

const updateReviewSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
  metadata: z.record(z.any()).optional(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "AUTH_ERROR",
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = updateReviewSchema.safeParse(body);

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

    const [updatedReview] = await db
      .update(reviews)
      .set({
        ...result.data,
        updatedAt: new Date(),
      })
      .where(and(eq(reviews.id, params.id), eq(reviews.userId, session.user.id)))
      .returning();

    if (!updatedReview) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RESOURCE_NOT_FOUND",
            message: "Review not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
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
