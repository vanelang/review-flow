import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Get webhook related logs
    const logs = await db
      .select()
      .from(auditLog)
      .where(and(eq(auditLog.userId, session.user.id), eq(auditLog.entityType, "webhook")))
      .orderBy(desc(auditLog.timestamp))
      .limit(limit)
      .offset((page - 1) * limit);

    const total = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(auditLog)
      .where(and(eq(auditLog.userId, session.user.id), eq(auditLog.entityType, "webhook")));

    return NextResponse.json({
      success: true,
      data: {
        logs,
        pagination: {
          total: total[0].count,
          page,
          limit,
          pages: Math.ceil(total[0].count / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching webhook logs:", error);
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
