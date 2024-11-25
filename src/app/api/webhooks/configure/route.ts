import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const webhookSchema = z.object({
  url: z.string().url(),
  events: z.array(
    z.enum([
      "review.created",
      "review.updated",
      "review.deleted",
      "widget.created",
      "widget.updated",
    ])
  ),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const result = webhookSchema.safeParse(body);

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

    // TODO: Implement webhook configuration storage
    // This would require adding a webhooks table to the schema

    return NextResponse.json({
      success: true,
      data: {
        url: result.data.url,
        events: result.data.events,
        status: "active",
      },
    });
  } catch (error) {
    console.error("Error configuring webhook:", error);
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
