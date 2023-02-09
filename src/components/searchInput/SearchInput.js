import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
//   const { filters } = useSelector((state) => state.dashboard);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

//   useEffect(() => {
//     if (filters.title) {
//       setSearchQuery("");
//     }
//   }, [filters.title]);

  return (
    <form onSubmit={onSubmit}>
      <TextField
        color="secondary" focused
        value={searchQuery}
        
        placeholder="Search by name"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;