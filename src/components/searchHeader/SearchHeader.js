import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomSearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
  },
  "&.MuiTextField-root": {
    width: "320px",
  },
  "&.MuiTextField-root:visited": {
    width: "400px",
  },
  mx: "auto",
}));

export default function SearchHeader({ handleDispatch }) {
  const { filters } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    handleDispatch(searchQuery);
  };

  useEffect(() => {
    if (filters.title) {
      setSearchQuery("");
    }
  }, [filters.title]);

  return (
    <form onSubmit={onSubmit}>
      <CustomSearchField
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