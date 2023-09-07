import { db } from "../configs/db";
import { Book } from "./book.types";

const bookSelectAttributes = {
  id: true,
  title: true,
  author: true,
  isbn: true,
};

export const listBooks = async (filter: string): Promise<Book[]> => {
  // return filtered books, and all book if no filter is provided
  if (filter) {
    return db.book.findMany({
      where: {
        OR: [
          { title: { contains: filter } },
          { author: { contains: filter } },
          { isbn: { contains: filter } },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: bookSelectAttributes,
    });
  }
  return db.book.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    select: bookSelectAttributes,
  });
};

export const getBook = async (id: number): Promise<Book | null> => {
  return db.book.findUnique({
    where: { id },
  });
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const { title, author, isbn } = book;
  return db.book.create({
    data: { title, author, isbn },
    select: bookSelectAttributes,
  });
};

export const updateBook = async (
  book: Omit<Book, "id">,
  id: number
): Promise<Book> => {
  const { title, author, isbn } = book;
  return db.book.update({
    where: { id },
    data: { title, author, isbn },
    select: bookSelectAttributes,
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: { id },
  });
};
