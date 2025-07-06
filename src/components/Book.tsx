import type { Book } from "../db/schema";

export function Book({
  book,
  onDelete,
}: {
  book: Book;
  onDelete: (id: number) => void;
}) {
  return (
    <div key={book.id} className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.id}</p>
      <p>Published: {book.title}</p>
      <div className="book-actions">
        <button onClick={(_e) => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
}
