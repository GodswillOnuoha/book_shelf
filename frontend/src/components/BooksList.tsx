import BookCard from "./BookCard.js";
import { Stack, Pagination } from "@mui/material";
import { Book as BookType } from "../ts/types.js";
import { ChangeEvent, useState } from "react";

type Props = {
  books: BookType[];
};
const pageSize = 4;

const BooksList = ({ books }: Props) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const pageCount = Math.ceil(books.length / pageSize);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPagination({ ...pagination, from, to });
  };

  return (
    <Stack spacing={1} mt={2}>
      {books.slice(pagination.from, pagination.to).map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
      <Pagination
        count={pageCount}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Stack>
  );
};

export default BooksList;
