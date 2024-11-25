import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Create SQL connection
const sql = neon(process.env.DATABASE_URL);

// Create and export database connection with schema
export const db = drizzle(sql, { schema });

// Export schema for use in other files
export { schema };

// Export type for the database
export type Database = typeof db;

// Helper function to get database connection
export async function getDb() {
  try {
    // Test the connection
    await sql`SELECT 1`;
    return db;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
}

// Helper function to run queries in a transaction
export async function withTransaction<T>(callback: (tx: Database) => Promise<T>): Promise<T> {
  try {
    // Start transaction
    await sql`BEGIN`;

    // Run the callback with transaction
    const result = await callback(db);

    // Commit transaction
    await sql`COMMIT`;

    return result;
  } catch (error) {
    // Rollback on error
    await sql`ROLLBACK`;
    throw error;
  }
}

// Helper to run multiple operations in a transaction
export async function transaction<T>(operations: (() => Promise<T>)[]): Promise<T[]> {
  return withTransaction(async () => {
    const results: T[] = [];
    for (const operation of operations) {
      results.push(await operation());
    }
    return results;
  });
}

// Example usage:
/*
await withTransaction(async (tx) => {
  // Create user
  const [user] = await tx
    .insert(schema.users)
    .values({ name: "John", email: "john@example.com" })
    .returning();

  // Create subscription
  await tx
    .insert(schema.subscriptions)
    .values({ userId: user.id, planId: "basic" });

  return user;
});

// Or with multiple operations:
await transaction([
  async () => await db.insert(schema.users).values(...),
  async () => await db.insert(schema.subscriptions).values(...),
]);
*/
