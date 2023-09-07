import BooksList from "./components/BooksList.js";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import AddBook from "./components/AddBook.js";
import { Container, Stack } from "@mui/material";
import { useBook } from "./ts/store.js";
import { useState, useEffect } from "react";
import { fetchBooks } from "./ts/actions.js";

function App() {
  const books = useBook((store) => store.books);
  const [query, setQuery] = useState("");
  const showBookForm = useBook((store) => store.isBookFormVisible);

  useEffect(() => {
    fetchBooks(query);
  }, [query]);

  return (
    <Container maxWidth="sm">
      <Header />
      <Stack>
        {showBookForm && <AddBook />}
        <Search onChange={setQuery} />
        <BooksList books={books} />
      </Stack>
    </Container>
  );
}

export default App;
