import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { bookRouter } from "./book/book.router";

const app = express();

app.use(cors({ credentials: true }));

app.use(bodyParser.json());
app.use("/api/books", bookRouter);

export { app };
