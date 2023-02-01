import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/system";
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
import { Box, Divider, Typography } from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";
import { LoadingButton } from "@mui/lab";

const infoSchema = Yup.object().shape({
  addressShip: Yup.string().required("AddressShip is required"),
  phone: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Phone is required"),
});

const defaultValues = {
  name: "",
  addressShip: "",
  phone: "",
};

function CartCheckOrder({ cartCount }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(infoSchema),
    defaultValues,
  });

  const {
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  let products = [];
  let priceShip = 2;
  let totalPrice = 0;
  let sum = 0;

  if (cartCount) {
    cartCount.forEach((item) => {
      products = [
        ...products,
        {
          product: item.productId?._id,
          amount: item.amount,
          sum: item.productId?.price * item.amount,
          cartId: item._id,
        },
      ];
      sum = item.productId?.price * item.amount;

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
    }, 1000);

    products.forEach((product) => {
      if (product.amount !== 0) {
        dispatch(deleteCart(product.cartId));
      }
    });
  };

  return (
    <Container spacing={3} sx={{ width: 1, p: 2 }} className="cart-container">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleConfirmtion)}
      >
        <Typography variant="h4" textAlign="center">
          Order Information
        </Typography>
   
       <FTextField 
        variant="standard" 
        name="name"
        label="Name"
        >
        </FTextField>
   
        <FTextField
          variant="standard"
          name="addressShip"
          label="AddressShip"
        >
        </FTextField>
    
        <FTextField 
        variant="standard" 
        name="phone"
        label="Phone"
        >
        </FTextField>
     

        {cartCount?.map((item, index) => {
          if (item.amount === 0) {
            return null;
          }
          return (
            <Box key={item._id}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  Product:
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  {item.productId?.productName}
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 14, md: 18, lg: 20 },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  Price :
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  {fCurrency(item.productId?.price)}
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 14, md: 18, lg: 20 },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  Sum:
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, md: 18, lg: 20 } }}>
                  {fCurrency((sum = item.productId?.price * item.amount))}
                </Typography>
              </Typography>

              <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
            </Box>
          );
        })}
        <Typography
          sx={{
            fontSize: { xs: 14, md: 18, lg: 20 },
          }}
        >
          Price Ship: {sum > 0 ? fCurrency(priceShip) : (priceShip = 0)}
        </Typography>
        <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
        <Typography
          sx={{
            fontSize: { xs: 16, md: 20, lg: 25 },
            fontWeight: 600,
          }}
          color="red"
        >
          Total Price : {fCurrency((totalPrice = totalPrice + priceShip))}
        </Typography>
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            // fullWidth
            type="submit"
            size="small"
            variant="contained"
            loading={isSubmitting}
          >
            Confirmation
          </LoadingButton>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default CartCheckOrder;
