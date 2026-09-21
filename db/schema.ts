import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reviews = sqliteTable(
  "reviews",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    packageSlug: text("package_slug").notNull(),
    reviewerName: text("reviewer_name").notNull(),
    reviewerEmail: text("reviewer_email").notNull(),
    rating: integer("rating").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    travelMonth: text("travel_month"),
    status: text("status").notNull().default("pending"),
    submitterKey: text("submitter_key").notNull(),
    createdAt: text("created_at").notNull(),
    moderatedAt: text("moderated_at"),
  },
  (table) => [
    index("idx_reviews_status_package_created").on(
      table.status,
      table.packageSlug,
      table.createdAt,
    ),
    index("idx_reviews_submitter_created").on(
      table.submitterKey,
      table.createdAt,
    ),
  ],
);
