import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        apiKey: randomUUID(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))
      .returning({
        apiKey: users.apiKey,
      });

    return NextResponse.json({ apiKey: updatedUser.apiKey });
  } catch (error) {
    console.error("Error generating API key:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
