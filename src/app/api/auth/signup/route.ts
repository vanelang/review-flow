import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using transaction
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name,
        password: hashedPassword,
      })
      .returning();

    // Create session token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
            7 * 24 * 60 * 60
          }`,
        },
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
