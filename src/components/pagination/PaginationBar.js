import { Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
const Scroll = require("react-scroll");
const scroll = Scroll.animateScroll;

function PaginationBar({ page, setPage, totalPage }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    scroll.scrollToTop({ smooth: true });
  }, [page]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

export default PaginationBar;
