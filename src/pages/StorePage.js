import { Button, Drawer, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ProductList from "../features/product/ProductList";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  getProductList,
  handleChangeFilters,
} from "../features/product/productSlice";

import { useDispatch, useSelector } from "react-redux";
import PaginationBar from "../components/pagination/PaginationBar";
import { PER_PAGE } from "../app/config";
import SearchInput from "../components/searchInput/SearchInput";
import useResponsive from "../hooks/useResponsive";
import ProductFilterTypes from "../features/product/ProductFilterTypes";
import ProductFilterStatus from "../features/product/ProductFilterStatus";
import ProductFilterPrice from "../features/product/ProductFilterPrice";

function StorePage() {
  const upLg = useResponsive("up", "lg");

  const dispatch = useDispatch();
  let {
    totalPages,
    filters,
    currentPage,
    totalProductList,

    products,
  } = useSelector((state) => state?.product);

  const handleDispatch = (value) => {
    dispatch(handleChangeFilters(value));
  };

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    dispatch(getProductList(filters));
  }, [filters, dispatch]);

  const handleSubmit = (searchQuery) =>
    dispatch(handleChangeFilters({ productName: searchQuery }));

  const handleChangePage = (page) => {
    let pagination = { page, limit: Number(PER_PAGE) };
    dispatch(getProductList(pagination));
  };

  return (
    <Container>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mb: 5}}
      >
        <SearchInput handleSubmit={handleSubmit} />
        <Button
          disableRipple
          color="inherit"
          startIcon={<FilterListIcon />}
          onClick={handleOpenFilter}
          sx={{
            display:{lg:"none"} 
          }}
        >
          Filter
        </Button>

        <Drawer
          anchor="left"
          open={openFilter}
          onClose={handleCloseFilter}
          PaperProps={{
            sx: { width: 280, border: "none", overflow: "hidden" },
          }}
        >
          <ProductFilterTypes
            onCloseFilter={handleCloseFilter}
            isOpenFilter={openFilter}
            handleDispatch={handleDispatch}
          />

          <ProductFilterStatus
            onCloseFilter={handleCloseFilter}
            isOpenFilter={openFilter}
            handleDispatch={handleDispatch}
          />

          <ProductFilterPrice
            handleDispatch={handleDispatch}
            isOpenFilter={openFilter}
            disableScrollBar={true}
          />
        </Drawer>
      </Stack>

      <Grid container spacing={3}>
        {upLg && (
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                textAlign: "center",
                alignItems: "center",
                // backgroundColor: "grey.200",
                borderRadius: 5,
                pb: 4,
                mt: 2,
              }}
            >
              <ProductFilterTypes
                handleDispatch={handleDispatch}
                disableScrollBar={true}
              />

              <ProductFilterStatus
                handleDispatch={handleDispatch}
                disableScrollBar={true}
              />

              <ProductFilterPrice
                handleDispatch={handleDispatch}
                disableScrollBar={true}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={9}>
          <ProductList products={products} />

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
        </Grid>
      </Grid>
    </Container>
  );
}

export default StorePage;
