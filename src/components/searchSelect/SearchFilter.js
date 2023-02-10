import React, { useState } from "react";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Box } from "@mui/system";

function SearchFilter({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", justifyContent: "space-around", alignItems:"center" }}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={searchQuery}
        label="Status"
        onChange={(event) => setSearchQuery(event.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Preparing Order">Preparing Order</MenuItem>
        <MenuItem value="Order is shipping">Order is shipping</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </Select>
      </FormControl>
      
      <form onSubmit={onSubmit}>
        <TextField
          variant="standard"
          sx={{ width: 0 }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button
                  type="submit"
                  color="secondary"
                  aria-label="Search by status"
                >
                  Filter
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </form>
    </Box>
  );
}

export default SearchFilter;
