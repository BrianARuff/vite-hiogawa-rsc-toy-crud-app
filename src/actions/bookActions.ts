"use server";
import { eq } from "drizzle-orm";
import { database } from "../db/index";
import { bookAuthorTable, bookTable, type Book } from "../db/schema";

export type BookReturnType =
  | Partial<Book> & { error?: boolean; message?: string; details?: string };

export async function createBook(title: string): Promise<BookReturnType> {
  try {
    const result = await database
      .insert(bookTable)
      .values({ title })
      .returning();

    return result?.[0];
  } catch (error) {
    return {
      error: true,
      message: "Failed to create book",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getAllBooks() {
  const result = await database.select().from(bookTable);
  return result;
}

export async function getBookById(id: number) {
  const result = await database
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, id));
  return result[0];
}

export async function updateBook(id: number, title: string) {
  const result = await database
    .update(bookTable)
    .set({ title })
    .where(eq(bookTable.id, id))
    .returning();
  return result[0];
}

export async function deleteBook(id: number) {
  const result = await database
    .delete(bookTable)
    .where(eq(bookTable.id, id))
    .returning();
  return result[0];
}

export async function deleteAllBooks() {
  try {
    const result = await database.delete(bookTable).returning();
    return { success: true, deletedCount: result.length };
  } catch (error) {
    return {
      error: true,
      message: "Failed to delete all books",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getBooksByAuthorId(authorId: number) {
  const result = await database
    .select()
    .from(bookTable)
    .innerJoin(bookAuthorTable, eq(bookTable.id, bookAuthorTable.bookId))
    .where(eq(bookAuthorTable.authorId, authorId));
  return result;
}
