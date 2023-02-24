import { Alert, Box, Card, Container, Stack, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../../components/searchSelect/SearchFilter";
import OrderUpdateStatus from "../../features/dashboard/order/OrderUpdateStatus";
import { getOrdersDashboard } from "../../features/order/orderSlice";
import useAuth from "../../hooks/useAuth";

import { TitleStyle } from "../../theme/customizations";
import "./dash.css";
import OrderListDas from "../../features/dashboard/order/OrderListDas";
import PaginationBar from "../../components/pagination/PaginationBar";
import { toast } from "react-toastify";

function EditOrderPage() {
  const [open, setOpen] = useState(false);
  const [orders, setOders] = useState([]);
  let [page, setPage] = useState(1);
  let [filterName, setFilterName] = useState("");
  const { user } = useAuth();
  const userId = user._id;
  const dispatch = useDispatch();
  const {

    ordersDashboard,
    totalPageDashboard,
    totalOrderDashboard,
  } = useSelector((state) => state.order);

  useEffect(
    (status) => {
      status = filterName;
      if (user) dispatch(getOrdersDashboard({ page, userId, status }));
    },
    [dispatch, page, user, userId, filterName]
  );

  const handleClickOpen = (order) => {
    if(order.status === "Delivered") {
      toast("You can't update, order delivered")
    }else{
    setOders(order);
    console.log(order)
    setOpen(true);
    }

  };
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" sx={{ py: 2 }}>
        <TitleStyle>
          <LocalShippingIcon sx={{ width: "35px", height: "35px" }} />
          <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
            Order
          </Typography>
        </TitleStyle>
      </Stack>

      {user?.role === "admin" ? (

      <>
      <OrderUpdateStatus orders={orders} setOpen={setOpen} open={open} />
      <>
        <Card>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <SearchFilter handleSubmit={handleSubmit} />
          </Box>

          <Container className="container_dash" sx={{ mb: 3 }}>
            <OrderListDas
              ordersDashboard={ordersDashboard}
              handleClickOpen={handleClickOpen}
            />
          </Container>

          <Box
            sx={{
              mt: { xs: 2, md: 5 },
              mb: { xs: 2, md: 5 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {totalOrderDashboard ? (
              <PaginationBar
                page={page}
                setPage={setPage}
                totalPage={+totalPageDashboard}
              />
            ) : (
              <Typography variant="h6">No order Yet</Typography>
            )}
          </Box>
        </Card>
      </>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ mb: 15 }} />
      </>
    ):(
      <Alert severity="error">You are not adminb</Alert>
    )}

    </Container>
  );
}

export default EditOrderPage;
