// src/db/schema.ts
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  companyName: text("company_name"),
  apiKey: uuid("api_key").defaultRandom().notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Plans table
export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(), // e.g., 'basic', 'pro', 'scale'
  price: integer("price").notNull(), // Price in cents
  reviewsLimit: integer("reviews_limit").notNull(),
  apiCallsLimit: integer("api_calls_limit").notNull(),
  widgetsLimit: integer("widgets_limit").notNull(),
  features: jsonb("features").notNull(), // e.g., ["Embedded Forms", "Review APIs"]
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User Subscriptions table
export const userSubscriptions = pgTable("user_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),
  status: text("status", { enum: ["active", "cancelled", "past_due"] })
    .default("active")
    .notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAt: timestamp("cancel_at"),
  canceledAt: timestamp("canceled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  widgetId: uuid("widget_id")
    .references(() => widgets.id)
    .notNull(),
  rating: integer("rating").notNull(), // e.g., 1-5
  title: text("title"),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorEmail: varchar("author_email", { length: 255 }),
  status: text("status", { enum: ["pending", "approved", "rejected"] })
    .default("pending")
    .notNull(),
  source: text("source", { enum: ["direct", "api", "widget"] })
    .default("direct")
    .notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Widget Types table
export const widgetTypes = pgTable("widget_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(), // e.g., 'review-form', 'testimonial', 'rating'
  description: text("description"),
});

// Widgets table
export const widgets = pgTable("widgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  typeId: uuid("type_id")
    .references(() => widgetTypes.id)
    .notNull(),
  config: jsonb("config").notNull(), // JSON configuration for widget behavior
  styles: jsonb("styles"), // JSON configuration for widget styling
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// API Usage table
export const apiUsage = pgTable("api_usage", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  endpoint: text("endpoint").notNull(), // e.g., '/api/reviews'
  method: text("method").notNull(), // e.g., 'GET', 'POST'
  statusCode: integer("status_code").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  responseTime: integer("response_time"), // in milliseconds
  ipAddress: varchar("ip_address", { length: 45 }), // IPv6 compatible
});

// Subscriptions table (if additional data is needed beyond userSubscriptions)
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),
  status: text("status", { enum: ["active", "cancelled", "past_due"] })
    .default("active")
    .notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAt: timestamp("cancel_at"),
  canceledAt: timestamp("canceled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Usage Logs table (optional: aggregate usage daily/weekly/monthly)
export const usageLogs = pgTable("usage_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  metric: text("metric").notNull(), // e.g., 'reviews', 'api_calls', 'widgets'
  count: integer("count").default(0).notNull(),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
