"use client";
import { useRef, useState, useTransition } from "react";
import { createBook } from "../actions/bookActions";
import type { Book } from "../db/types";

interface AddBookFormProps {
  onBookAdded: (newBook: Book) => void;
}

export function AddBookForm({ onBookAdded }: AddBookFormProps) {
  const [isPending, startTransition] = useTransition();
  const addBookFormRef = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;

    if (!title) return;

    startTransition(async () => {
      try {
        const newBook = await createBook(title);

        setError(null);

        addBookFormRef?.current?.reset?.();

        if (newBook?.error) {
          setError(newBook.message || "Failed to create book");
        } else {
          onBookAdded(newBook as Book);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to create book"
        );
      }
    });
  };

  return (
    <>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <form
        id="book-form"
        ref={addBookFormRef}
        action={handleSubmit}
        className="add-book-form"
      >
        <h3>Add New Book</h3>
        <input type="text" name="title" placeholder="Book title" required />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Book"}
        </button>
      </form>
    </>
  );
}
