import { auth } from "@/lib/auth";
import { db } from "@/db";
import { widgets } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateWidgetSchema = z.object({
  name: z.string().min(2).optional(),
  type: z.enum(["review-form", "testimonial", "rating"]).optional(),
  config: z.record(z.any()).optional(),
  styles: z.record(z.any()).optional(),
  domains: z.array(z.string()).min(1).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const { id } = await Promise.resolve(context.params);

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const result = updateWidgetSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [widget] = await db
      .update(widgets)
      .set({
        ...result.data,
        updatedAt: new Date(),
      })
      .where(and(eq(widgets.id, id), eq(widgets.userId, session.user.id)))
      .returning();

    if (!widget) {
      return new NextResponse("Widget not found", { status: 404 });
    }

    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error updating widget:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = await Promise.resolve(context.params);

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [widget] = await db
      .delete(widgets)
      .where(and(eq(widgets.id, id), eq(widgets.userId, session.user.id)))
      .returning();

    if (!widget) {
      return new NextResponse("Widget not found", { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting widget:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
