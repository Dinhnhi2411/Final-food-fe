import { Button, Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import { getProductsTopSelling } from "./productSlice";

function ProductTopList() {
  const { isLoasing, productsTopSelling } = useSelector(
    (state) => state?.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsTopSelling({}));
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{
          mt: 5,
          mb: 5,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
        className="title"
          sx={{
            fontSize: { xs: 18, md: 25, lg: 35 },
            m: 2,
            fontFamily: "Comic Sans MS",
            color: "#000",
          }}
        >
          Top Selling
       
        </Button>
         <Divider />
        <ProductList products={productsTopSelling} isLoading={isLoasing} />
      </Box>
    </Container>
  );
}

export default ProductTopList;
