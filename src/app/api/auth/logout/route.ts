import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // You might want to do some cleanup here
    // Like invalidating tokens, clearing cookies, etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
