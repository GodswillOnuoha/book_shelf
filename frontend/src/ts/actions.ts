import { Book } from "./types.js";
import { useBook } from "./store.js";
import { apiURL } from "./config.js";

const store = useBook.getState();

// Fetch Books
const fetchBooks = async (query: string) => {
  const res = await fetch(`${apiURL}/books?filter=${query}`);
  const data = await res.json();
  store.setBooks(data);
};

// Create Book
const createBook = async (book: Book) => {
  const res = await fetch(`${apiURL}/books`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await res.json();
  store.addBook(data);
  store.setFormVisibility(false);
};

// Update Book
const updateBook = async (book: Book) => {
  const res = await fetch(`${apiURL}/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await res.json();
  store.updateBook(data);
  store.setFormVisibility(false);
};

// Delete Book
const deleteBook = async (id: number) => {
  await fetch(`${apiURL}/books/${id}`, {
    method: "DELETE",
  });

  store.deleteBook(id);
};

export { fetchBooks, createBook, updateBook, deleteBook };
