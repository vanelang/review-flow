import { auth } from "@/lib/auth";
import { db } from "@/db";
import { widgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for widget creation/update
const widgetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["review-form", "testimonial", "rating"]),
  config: z.record(z.any()),
  styles: z.record(z.any()).optional(),
  domains: z.array(z.string()).min(1, "At least one domain is required"),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userWidgets = await db
      .select()
      .from(widgets)
      .where(eq(widgets.userId, session.user.id))
      .orderBy(widgets.createdAt);

    return NextResponse.json(userWidgets);
  } catch (error) {
    console.error("Error fetching widgets:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const result = widgetSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [widget] = await db
      .insert(widgets)
      .values({
        ...result.data,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(widget, { status: 201 });
  } catch (error) {
    console.error("Error creating widget:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
