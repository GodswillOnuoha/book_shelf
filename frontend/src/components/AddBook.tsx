import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useBook } from "../ts/store.js";
import * as service from "../ts/actions.js";

const AddBook = () => {
  const book = useBook((state) => state.editBook);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);
  const _id = book.id;

  const saveBook = async () => {
    if (!title || !author || !isbn) {
      alert("Please fill all required fields");
      return;
    }

    if (_id) {
      // update book
      await service.updateBook({ title, author, isbn, id: _id });
    } else {
      // add new book
      await service.createBook({ title, author, isbn });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ px: 2, mb: 4 }}>
        <TextField
          required
          id="title-input"
          label="Title"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          id="author-input"
          label="Author"
          size="small"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          required
          id="isbn-input"
          label="ISBN"
          size="small"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ width: "50%" }}
          onClick={() => saveBook()}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default AddBook;
