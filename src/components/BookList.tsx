"use server";
import { getAllBooks } from "../actions/bookActions";
import styles from "./BookList.module.css";
import { BookManager } from "./BookManager";

export async function BookList() {
  const books = await getAllBooks();

  try {
    return (
      <div className={styles.bookListContainer}>
        <BookManager initialBooks={books} />
      </div>
    );
  } catch (error) {
    console.error("Failed to load books:", error);
    return (
      <div className="error">
        <p>Failed to load books</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}

export default BookList;
