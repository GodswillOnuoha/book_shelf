import { Button, Grid } from "@mui/material";
import { useBook } from "../ts/store.js";

const Header = () => {
  const title = "Book Shelf";
  const isBookFormVisible = useBook((store) => store.isBookFormVisible);
  const setFormVisibility = useBook((store) => store.setFormVisibility);

  const color = isBookFormVisible ? "secondary" : "success";
  return (
    <Grid container my={4}>
      <Grid item xs={10}>
        <h1>{title}</h1>
      </Grid>
      <Grid item xs={2} textAlign={"end"}>
        <Button
          variant="contained"
          color={color}
          onClick={() => {
            setFormVisibility(!isBookFormVisible);
          }}
        >
          {isBookFormVisible ? "Close" : "Add"}
        </Button>
      </Grid>
    </Grid>
  );
};
Header.defaultProps = {
  title: "Book Shelf",
};
export default Header;
