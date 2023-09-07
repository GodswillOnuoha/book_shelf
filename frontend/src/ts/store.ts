import { create } from "zustand";
import { Book } from "./types.js";

const defaultBook = { title: "", author: "", isbn: "" };

interface StoreStructure {
  books: Book[];
  editBook: Book;
  isBookFormVisible: boolean;

  setFormVisibility: (value: boolean) => void;
  updateBook: (updatedBook: Book) => void;
  addBook: (book: Book) => void;
  setBooks: (books: Book[]) => void;
  setEdit: (book: Book) => void;
  deleteBook: (id: number) => void;
}

export const useBook = create<StoreStructure>((set, get) => ({
  books: [],
  editBook: defaultBook,
  isBookFormVisible: false,

  deleteBook: (id) =>
    set({ books: [...get().books.filter((book) => book.id !== id)] }),
  updateBook: (updatedBook) =>
    set({
      books: [
        updatedBook,
        ...get().books.filter((book) => book.id !== updatedBook.id),
      ],
    }),
  setFormVisibility: (value) => {
    value
      ? set({ isBookFormVisible: value })
      : set({ isBookFormVisible: value, editBook: defaultBook });
  },
  setEdit: (book) => set({ editBook: book, isBookFormVisible: true }),
  addBook: (book: Book) => set({ books: [book, ...get().books] }),
  setBooks: (books) => set({ books: books }),
}));
