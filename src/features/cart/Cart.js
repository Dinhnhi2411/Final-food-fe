import { Box, Button, Container, Typography } from "@mui/material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./cart.css";
import { deleteCart, updateCart } from "./cartSlice";

function Cart({ cartCount, setCartCount }) {
  const { user } = useAuth();

  const dispatch = useDispatch();
  
  // eslint-disable-next-line
  const [amountInput, setAmountInput] = useState(false);

  const handleInc = (id, amount) => {
    setAmountInput(false);
    setCartCount(
      cartCount.map((item) =>
        id === item._id ? { ...item, amount: item.amount + 1 } : item
      )
    );

    amount += 1;
    dispatch(updateCart(id, amount));
  };

  const handleDec = (id, amount) => {
    setAmountInput(false);
    setCartCount(
      cartCount.map((item) =>
        id === item._id
          ? { ...item, amount: item.amount - (item.amount > 1 ? 1 : 0) }
          : item
      )
    );
    amount -= amount > 1 ? 1 : 0;
    dispatch(updateCart(id, amount));
  };

  const handleDel = (id) => {
    if (user) {
      dispatch(deleteCart(id));
    }
  };

  return (
    <Container className="cart-container">
      <Typography variant="h4" textAlign="center">
        Shopping Cart
      </Typography>
      {cartCount?.length === 0 ? (
        <Box className="cart-empty">
          <Typography variant="h5" textAlign="center">
            Your cart is currently empty
          </Typography>
          <Box className="start-shopping">
            <Link to="/">
              <Typography variant="h6"> 🔙 Start Shopping</Typography>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </Box>
          <Box className="cart-items">
            {cartCount &&
              cartCount.map((cart) => (
                <Box className="cart-item" key={cart?.productId?._id}>
                  <Box className="cart-product">
                    <img src={cart?.productId?.image[0]} alt="" />
                    <Box>
                      <Typography fontWeight={500} ml={0.5} fontSize={20}>
                        {cart?.productId?.productName}
                      </Typography>

                      <Button
                        size="small"
                        sx={{
                          color: "primary",
                        }}
                        onClick={(e) => {
                          handleDel(cart._id);
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                  <Typography>$ {cart?.productId?.price}</Typography>
                  <Box className="cart-product-quantity">
                    <Button
                      onClick={() => {
                        handleDec(cart._id, cart.amount);
                      }}
                    >
                      ⚊
                    </Button>
                    <Box className="count">{cart.amount}</Box>
                    <Button
                      onClick={() => {
                        handleInc(cart._id, cart.amount);
                      }}
                    >
                      ✚
                    </Button>
                  </Box>
                  <Box className="cart-product-total-price">
                    $ {cart?.productId?.price * cart?.amount}
                  </Box>
                </Box>
              ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box className="continue-shopping">
              <Link to="/store">
                <Typography variant="h6">🔙 Continue Shopping</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default Cart;
