import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormProvider, FTextField } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import { createOrder } from "../order/orderSlice";
import { deleteCart } from "./cartSlice";
import "./cart.css";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CartTotal from "./CartTotal";
import CartTable from "./CartTable";
import { Container } from "@mui/system";

const infoSchema = Yup.object().shape({
  name:Yup.string().required("Name is required*"),
  addressShip: Yup.string().required("AddressShip is required*"),
  phone: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Phone is required*"),
});

const defaultValues = {
  name: "",
  addressShip: "",
  phone: "",
};

function CartOrder({ carts }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(infoSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Tính toán

  let products = [];
  let priceShip = 2;
  let totalPrice = 0;
  let sum = 0;

  if (carts) {
    carts.forEach((item) => {
      products = [
        ...products,
        {
          product: item.productId?._id,
          amount: item.amount,
          price:item.productId?.priceSale,
          sum: item.productId?.priceSale * item.amount,
          cartId: item._id,
        },
      ];
      sum = item.productId?.priceSale * item.amount;

      totalPrice += sum;

      return totalPrice;
    });
  }

  const handleConfirmtion = async (data) => {
    await dispatch(
      createOrder({
        name: data.name,
        addressShip: data.addressShip,
        phone: data.phone,
        products: products,
        priceShip: priceShip,
        total: totalPrice,
        userId: user._id,
      })
    );
    setTimeout(() => {
      navigate("/order");
    }, 500);

    products?.forEach((product) => {
      if (product.amount !== 0) {
        dispatch(deleteCart(product.cartId));
      }
    });
  };

  return (
    <Container className="cart-order">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleConfirmtion)}
      >
        <Typography
          className="title"
          textAlign="end"
          sx={{
            mb: 2,
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Click "Checkout" to complete order !
        </Typography>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<PaymentIcon />}
            loading={isSubmitting}
            color="warning"
          >
            Checkout
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box className="cart-container">
              <Typography variant="h5" textAlign="center">
                📄{""} Order Information
              </Typography>

              <FTextField
                variant="standard"
                name="name"
                label="Name"
                defaultValue="Hello World"
              ></FTextField>

              <FTextField
                variant="standard"
                name="addressShip"
                label="AddressShip"
              ></FTextField>
              <FTextField
                variant="standard"
                name="phone"
                label="Phone"
              ></FTextField>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={3}
                sx={{ p: 2 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset(defaultValues);
                  }}
                  startIcon={<ClearAllIcon />}
                >
                  Clear
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <CartTotal cartCount={carts} />
          </Grid>
        </Grid>
        <CartTable carts={carts} />
      </FormProvider>
    </Container>
  );
}

export default CartOrder;
