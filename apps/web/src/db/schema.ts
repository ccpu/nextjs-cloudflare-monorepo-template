import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const pageVisits = sqliteTable('page_visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  page_path: text('page_path').notNull(),
  visit_date: text('visit_date').notNull(), // YYYY-MM-DD format
  visitor_country: text('visitor_country'), // Optional country code
  total_visits: integer('total_visits').notNull().default(1),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});
