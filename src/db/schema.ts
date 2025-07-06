import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// author table
export const authorTable = sqliteTable("author_table", {
  id: integer("author_id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull(),
});

// book table
export const bookTable = sqliteTable("book_table", {
  id: integer("book_id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("title").notNull().unique(),
});

// book_author table
export const bookAuthorTable = sqliteTable("book_author_table", {
  bookId: integer("book_id")
    .notNull()
    .references(() => bookTable.id),
  authorId: integer("author_id")
    .notNull()
    .references(() => authorTable.id),
});

export type BookAuthor = typeof bookAuthorTable.$inferSelect;
export type BookAuthorInsert = typeof bookAuthorTable.$inferInsert;

export type Author = typeof authorTable.$inferSelect;
export type AuthorInsert = typeof authorTable.$inferInsert;

export type Book = typeof bookTable.$inferSelect;
export type BookInsert = typeof bookTable.$inferInsert;

export const schema = {
  bookAuthorTable,
  authorTable,
  bookTable,
};

export type Schema = typeof schema;
