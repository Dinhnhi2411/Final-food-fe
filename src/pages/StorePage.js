import { Alert, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect} from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import ProductList from "../features/product/ProductList";
import "./stylePage.css";
import {
  getProductList,
  
  handleChangeFilters,
} from "../features/product/productSlice";

import { useDispatch, useSelector } from "react-redux";
import PaginationBar from "../components/pagination/PaginationBar";
import { PER_PAGE } from "../app/config";
import SearchInput from "../components/searchInput/SearchInput";
import ProductSort from "../features/product/ProductSort";

function StorePage() {
  const dispatch = useDispatch();
  let {
    totalPages,
    filters,
    currentPage,
    totalProductList,
    isLoading,
    products,
    error,
  } = useSelector((state) => state.product);

  const handleDispatch = (value) => {
    dispatch(handleChangeFilters(value));
  };

  useEffect(() => {
    dispatch(getProductList());
  }, [filters, dispatch]);

  const handleSubmit = (searchQuery) =>
    dispatch(handleChangeFilters({ productName: searchQuery }));

  const handleChangePage = (page) => {
    let pagination = { page, limit: Number(PER_PAGE) };
    dispatch(getProductList(pagination));
  };

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="center"
          mb={2}
        >
          <SearchInput handleSubmit={handleSubmit} />
          <ProductSort handleDispatch={handleDispatch} />
        </Stack>

        <Box sx={{ position: "relative", height: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={products} />
              )}
            </>
          )}
        </Box>

        <Box
          sx={{
            mt: { xs: 2, md: 5 },
            mb: { xs: 2, md: 5 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          {totalProductList ? (
            <PaginationBar
              page={currentPage}
              setPage={handleChangePage}
              totalPage={+totalPages}
            />
          ) : (
            <Typography variant="h6">No Products Yet</Typography>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default StorePage;
