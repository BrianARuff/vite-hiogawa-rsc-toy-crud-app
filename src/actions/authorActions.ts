"use server";
import { eq } from "drizzle-orm";
import { database } from "../db/index";
import { authorTable } from "../db/schema";

export async function createAuthor(name: string) {
  const result = await database
    .insert(authorTable)
    .values({ name })
    .returning();
  return result[0];
}

export async function getAllAuthors() {
  const result = await database.select().from(authorTable);
  return result;
}

export async function getAuthorById(id: number) {
  const result = await database
    .select()
    .from(authorTable)
    .where(eq(authorTable.id, id));
  return result[0];
}

export async function updateAuthor(id: number, name: string) {
  const result = await database
    .update(authorTable)
    .set({ name })
    .where(eq(authorTable.id, id))
    .returning();
  return result[0];
}

export async function deleteAuthor(id: number) {
  const result = await database
    .delete(authorTable)
    .where(eq(authorTable.id, id))
    .returning();
  return result[0];
}
