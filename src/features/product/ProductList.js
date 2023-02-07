import React from "react";
import { Alert, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductSkeleton";
import { Box } from "@mui/system";

function ProductList({ products, isLoading }) {
  return (
    <Box>
      <Grid container spacing={1} mt={0}>
        {products.length === 0 && (
          <Alert
            severity="info"
            sx={{
              width: "100%",
              textAlign: "center",
              m: 4,
              mt: 6,
              backgroundColor: "white",
            }}
          >{`No results found`}</Alert>
        )}
        {products.map((item, index) => (
          <Grid key={item._id} item xs={6} sm={6} md={4} lg={3}>
            {isLoading ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={item} isLoading={isLoading} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
