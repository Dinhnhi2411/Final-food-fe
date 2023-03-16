import {
  Box,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { fCurrency, fNumber } from "../../utils/numberFormat";

function CartTable({ carts }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: "#000f09",
    fontSize:17
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

  return (
    <Container className="cart-container">
     <Typography fontSize={23} mb={1} textAlign="center">🔖 {""} Selected Products </Typography>

      <TableContainer component={Box} >
        <Table sx={{ minWidth: 700 }} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">Prices($)</StyledTableCell>
              <StyledTableCell align="right">Prices Sale($)</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Total ($)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts?.map((cart) => (
              <TableRow key={cart.productId._id}>
                <StyledTableCell component="th" scope="row">
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ minWidth: "500px" }}
                  >
                    <Box sx={{ maxWidth: "100px", height: "100%" }}>
                      <img
                        src={cart?.productId?.image?.[0]}
                        alt={cart?.productId?.productName}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Typography
                      
                      component={Link}
                      to={`/products/public/${cart.productId._id}`}
                      
                      sx={{color:"primary.main", fontWeight:"700", textDecoration:"none"}}
                      
                    >
                      {cart.productId.productName}
                    </Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <Typography variant="h7" sx={{color:"primary.main",  fontWeight:"700"}}>
                    {fCurrency(cart.productId.price)}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell align="right" >
                  <Typography variant="h7"  sx={{color:"primary.main",  fontWeight:"700"}}>
                    {fCurrency(cart.productId.priceSale)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1}
                  >
                    <Typography variant="h7" sx={{color:"primary.main",  fontWeight:"700"}}>
                      {fNumber(cart.amount)}
                    </Typography>
                  </Stack>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Typography variant="h7" sx={{color:"primary.main", fontWeight:"700" }}>
                    {fCurrency(cart.amount * cart.productId.priceSale)}
                  </Typography>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  );
}

export default CartTable;
