import { Container, Box, Grid } from "@mui/material";
import React from "react";
import Cart from "./Cart";
import CartCheckOrder from "./CartCheckOrder";

function CartList({ carts }) {
 
  const [cartCount, setCartCount] = React.useState(()=>{
    if (carts && carts.Carts && carts.Carts.length > 0 )
    return carts.Carts;
    return [];
  });

  React.useEffect(() => {
    setCartCount(carts.Carts);
  }, [carts.Carts]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Cart cartCount={cartCount} setCartCount={setCartCount} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CartCheckOrder cartCount={cartCount} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartList;
