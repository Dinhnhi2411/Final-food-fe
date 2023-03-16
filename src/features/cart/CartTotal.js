import { Box, Divider, Paper, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoading from "../../components/skeleton/SkeletonLoading";
import { fCurrency } from "../../utils/numberFormat";

function CartTotal({ cartCount }) {
  const { isLoading } = useSelector(
    (state) => state.cart
  );

  const calSubTotal = cartCount?.reduce(
    (acc, curr, index, arr) => {
      acc.subTotal = acc.subTotal + curr.productId.priceSale * curr.amount;
      acc.shipping = acc.shipping + 2;
      if (index === arr.length - 1) {
        acc.shipping = acc.shipping / arr.length;
        acc.total = acc.subTotal + acc.shipping;
      }
      return acc;
    },
    { subTotal: 0, shipping: 0, total: 0 }
  );

 
  return (
    <Container className="cart-container">
      {isLoading ? (
        <SkeletonLoading
          count={2}
          isLoading={isLoading}
          height="25px"
          width="100%"
        />
      ) : (
        <>
         
          <Typography fontSize={23} textAlign="center">📋 {""} Payment Detail</Typography>
          <Divider sx={{ m: 1 }} />
          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              SubTotal:
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              {!isLoading && fCurrency(calSubTotal?.subTotal)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              PriceShip:
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              {!isLoading && fCurrency(calSubTotal?.shipping)}
            </Typography>
          </Stack>
        </>
      )}
      <Divider sx={{ m: 1 }} />
      {isLoading ? (
        <SkeletonLoading isLoading={isLoading} height="30px" width="100%" />
      ) : (
        <Stack direction="row" justifyContent="space-Between" spacing={2}>
           <Typography variant="h6" textAlign="center">
              Total Payment:
            </Typography>
          <Typography variant="h6" textAlign="center">
            {!isLoading && fCurrency(calSubTotal?.total)}
          </Typography>
        </Stack>
      )}
    </Container>
  );
}

export default CartTotal;
