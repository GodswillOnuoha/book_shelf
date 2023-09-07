import * as dotenv from "dotenv";
import supertest from "supertest";
import { app } from "../app";
import { createBook } from "../book/book.service";
import { Book } from "../book/book.types";

dotenv.config();
if (process.env.ENVIRONMENT.toUpperCase() !== "TEST") {
  console.log("Only run test in test environment.");
  process.exit(1);
}

const api = supertest(app);

const assertBookProperties = (book: Book) => {
  expect(book).toHaveProperty("id");
  expect(book).toHaveProperty("title");
  expect(book).toHaveProperty("author");
  expect(book).toHaveProperty("isbn");
};

describe("book", () => {
  describe("get book", () => {
    describe("given book does not exist", () => {
      it("should return status 404", async () => {
        const bookId = 231;
        await api.get(`/api/books/${bookId}`).expect(404);
      });
    });

    describe("given book does exist", () => {
      let responseBody: Book, responseCode: number;

      beforeAll(async () => {
        const book = await createBook({
          title: "testbook1",
          author: "test",
          isbn: "0907test9797",
        });
        const { body, statusCode } = await api.get(`/api/books/${book.id}`);
        responseBody = body;
        responseCode = statusCode;
      });

      it("should return 200", () => {
        expect(responseCode).toBe(200);
      });

      it("should return a book", () => {
        assertBookProperties(responseBody);
      });
    });
  });

  describe("get books", () => {
    let responseBody: Book[], responseCode: number;

    beforeAll(async () => {
      const { body, statusCode } = await api.get("/api/books");
      responseBody = body;
      responseCode = statusCode;
    });

    it("should return 200", async () => {
      expect(responseCode).toBe(200);
    });

    it("should return array of books", async () => {
      expect(responseBody.constructor).toBe(Array);
      assertBookProperties(responseBody[0]);
    });
  });

  describe("update book", () => {
    const updatedBook = {
      title: "updated book title",
      author: "test",
      isbn: "0907test979",
    };
    let responseBody: Book, responseCode: number;

    beforeAll(async () => {
      const book = await createBook({
        title: "testbook1",
        author: "test",
        isbn: "0907test979",
      });
      const { body, statusCode } = await api
        .put(`/api/books/${book.id}`)
        .send(updatedBook);
      responseBody = body;
      responseCode = statusCode;
    });

    it("should return 200", async () => {
      expect(responseCode).toBe(200);
    });

    it("should return the updated book", async () => {
      const { title, author, isbn } = responseBody;
      expect({ title, author, isbn }).toMatchObject(updatedBook);
      assertBookProperties(responseBody);
    });
  });

  describe("create book", () => {
    describe("given the right parameters", () => {
      const newBook = {
        title: "testbook1",
        author: "test",
        isbn: "0907test97673",
      };
      let responseBody: Book, responseCode: number;

      beforeAll(async () => {
        const { body, statusCode } = await api.post("/api/books").send(newBook);
        responseBody = body;
        responseCode = statusCode;
      });

      it("should return 201", async () => {
        expect(responseCode).toBe(201);
      });

      it("should return the created book", async () => {
        const { title, author, isbn } = responseBody;
        expect({ title, author, isbn }).toMatchObject(newBook);
      });
    });
  });
});
