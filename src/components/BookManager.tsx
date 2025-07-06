"use client";
import { useState, useTransition } from "react";
import { deleteAllBooks } from "../actions/bookActions";
import type { Book } from "../db/types";
import { AddBookForm } from "./AddBookForm";
import { BookListClient } from "./BookListClient";

interface BookManagerProps {
  initialBooks: Book[];
}

export function BookManager({ initialBooks }: BookManagerProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks || []);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleBookAdded = (newBook: Book) => {
    setBooks((prev) => [...prev, newBook]);
  };

  const handleBookDeleted = (bookId: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const handleDeleteAll = () => {
    if (books.length === 0) return;

    if (
      confirm(
        `Are you sure you want to delete all ${books.length} books? This action cannot be undone.`
      )
    ) {
      startTransition(async () => {
        try {
          const result = await deleteAllBooks();

          if (result.error) {
            setError(result.message || "Failed to delete all books");
          } else {
            setBooks([]);
            setError(null);
          }
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to delete all books"
          );
        }
      });
    }
  };

  return (
    <div id="root">
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <AddBookForm onBookAdded={handleBookAdded} />

      <div className="book-controls">
        {books.length > 0 && (
          <button
            onClick={handleDeleteAll}
            disabled={isPending}
            className="delete-all-button"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: isPending ? "not-allowed" : "pointer",
              marginBottom: "16px",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? "Deleting..." : `Delete All Books (${books.length})`}
          </button>
        )}
      </div>

      <BookListClient books={books} onBookDeleted={handleBookDeleted} />
    </div>
  );
}
