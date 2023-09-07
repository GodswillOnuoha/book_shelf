import { TextField } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash-es";

type Props = {
  onChange: (value: string) => void;
};

const Search = ({ onChange }: Props) => {
  const debounceChange = debounce(
    useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    ),
    300
  );

  return (
    <TextField
      onChange={debounceChange}
      label="search"
      sx={{ width: 300 }}
      size="small"
    />
  );
};

export default Search;
