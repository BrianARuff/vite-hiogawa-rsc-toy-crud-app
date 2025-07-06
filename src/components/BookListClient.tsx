// "use client";
import { v4 } from "uuid";
import { deleteBook } from "../actions/bookActions";
import type { Book } from "../db/types";

interface BookListClientProps {
  books: Book[];
  isStatic?: boolean;
  onBookDeleted: (bookId: number) => void;
}

export function BookListClient({
  books,
  onBookDeleted,
  isStatic = false,
}: BookListClientProps) {
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        onBookDeleted(id);
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={v4()} className="book-card">
              <h3>{book.title}</h3>
              <p>Author: {book.id}</p>
              <p>Published: {book.title}</p>
              {!isStatic ? (
                <div className="book-actions">
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
