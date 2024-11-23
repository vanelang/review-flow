import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    const result = await db
      .update(reviews)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(reviews.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating review:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
