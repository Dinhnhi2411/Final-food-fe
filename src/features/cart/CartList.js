import { Container, Grid, Button, Stack, Typography, Divider } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import CartDetail from "./CartDetail";
import CartTotal from "./CartTotal";

function CartList({ carts, handleActiveStep }) {
  const [cartCount, setCartCount] = React.useState(() => {
    if (carts && carts.Carts && carts.Carts.length > 0) return carts.Carts;
    return [];
  });

  React.useEffect(() => {
    setCartCount(carts.Carts);
  }, [carts.Carts]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CartDetail cartCount={cartCount} setCartCount={setCartCount} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CartTotal cartCount={cartCount} />
          <Divider sx={{ mt: 2 }} />
          <Stack sx={{ py: 3}}>
            <Typography
            className="title" 
            textAlign="center" 
            sx={{
            mb:2 ,
            fontWeight:300,
            fontStyle:"italic"
            }}
            >
               Click "Payment" to continue order !</Typography>
            <Button
              size="large"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleActiveStep}
              color="warning"
            >
              Payment
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartList;
