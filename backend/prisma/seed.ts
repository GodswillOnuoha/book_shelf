import { db } from "../src/configs/db";

type Book = {
  title: string;
  author: string;
  isbn: string;
};

async function seed() {
  await Promise.all(
    getBooks().map((book) => {
      return db.book.create({ data: book });
    })
  );
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "89638y898y8687",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "89638y898y8678",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "4989fuy89",
    },
    {
      title: "One Hundred Years of Solitude",
      author: "Gabriel García",
      isbn: "5989fuy85",
    },
    {
      title: "In Cold Blood",
      author: "Truman Capote",
      isbn: "2989fuy82",
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      isbn: "7989fuy67",
    },
    {
      title: "The Secret History",
      author: "Donna Tartt",
      isbn: "9989fuy05",
    },
    {
      title: "The Call of the Wild",
      author: "Jack London",
      isbn: "2989fuy83",
    },
  ];
}

seed();
