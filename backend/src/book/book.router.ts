import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as BookService from "./book.service";

export const bookRouter = express.Router();

// GET: List of all books
bookRouter.get("/", async (request: Request, response: Response) => {
  try {
    const { filter } = request.query;
    const books = await BookService.listBooks(filter as string);
    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A single book by ID
bookRouter.get("/:id([0-9]+)", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const book = await BookService.getBook(id);
    if (book) {
      return response.status(200).json(book);
    }
    return response.status(404).json("Book not found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a Book
// Params: title, author, isbn
bookRouter.post(
  "/",
  body("title").isString(),
  body("author").isString(),
  body("isbn").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const book = request.body;
      const newBook = await BookService.createBook(book);
      return response.status(201).json(newBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update a Book
// Params: title, author, isbn
bookRouter.put(
  "/:id([0-9]+)",
  body("title").isString(),
  body("author").isString(),
  body("isbn").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);

    try {
      const book = request.body;
      const updatedBook = await BookService.updateBook(book, id);
      return response.status(200).json(updatedBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete a Book by ID
bookRouter.delete(
  "/:id([0-9]+)",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      await BookService.deleteBook(id);
      return response.status(204).json("Book successfully deleted.");
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
