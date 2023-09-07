import { Book } from "../ts/types.js";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useBook } from "../ts/store.js";
import * as service from "../ts/actions.js";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const setEdit = useBook((store) => store.setEdit);

  // Edit book
  const onEdit = (book: Book) => {
    setEdit(book);
  };

  // Delete Book
  const onDelete = async (id: number) => {
    await service.deleteBook(id);
  };

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 140 }}
          image="https://loremflickr.com/320/240/books,book"
          alt="Live from space album cover"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {book.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            by: {book.author}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            isbn: {book.isbn}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Chip
              label="edit"
              color="primary"
              onClick={() => {
                onEdit(book);
              }}
            />
            <Chip
              label="delete"
              onClick={() => {
                onDelete(book.id!);
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      <Divider variant="inset" component="span" />
    </>
  );
};

export default BookCard;
