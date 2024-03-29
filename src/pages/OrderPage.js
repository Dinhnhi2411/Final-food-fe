import { Alert, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationBar from "../components/pagination/PaginationBar";
import OrderList from "../features/order/OrderList";
import { getOrder } from "../features/order/orderSlice";
import useAuth from "../hooks/useAuth";

function OrderPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { orders, totalPages, totalOrders, error } = useSelector(
    (state) => state?.order
  );

  useEffect(() => {
    if (user) {
      dispatch(getOrder({ page }));
    }
  }, [dispatch, page, user]);

  return (
    <Container>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <OrderList orders={orders} />
      )}
      <Box
        sx={{
          mt: { xs: 2, md: 5 },
          mb: { xs: 2, md: 5 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {totalOrders ? (
          <PaginationBar
            page={page}
            setPage={setPage}
            totalPage={+totalPages}
          />
        ) : (
          <Typography variant="h6">No Order Now</Typography>
        )}
      </Box>
    </Container>
  );
}

export default OrderPage;
