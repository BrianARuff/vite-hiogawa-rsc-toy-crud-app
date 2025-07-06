CREATE TABLE `author_table` (
	`author_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book_author_table` (
	`book_id` integer NOT NULL,
	`author_id` integer NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `book_table`(`book_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `author_table`(`author_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `book_table` (
	`book_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL
);
