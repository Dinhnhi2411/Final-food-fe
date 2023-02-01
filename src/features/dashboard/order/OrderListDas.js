import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { fCurrency } from "../../../utils/numberFormat";
import ButtonStatus from "./ButtonStatus";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function OrderListDas({ ordersDashboard, handleClickOpen }) {
  return (
    <Grid container spacing={2} mt={1}>
      {ordersDashboard?.map((order) => {
        order.products.map((product) => {
          return product;
        });
        return (
          <Grid key={order?._id} item xs={12} md={4} lg={3}>
            <Card key={order?._id} sx={{ p:2, m:1, minHeight: 500 }}>
              <Box
                
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ButtonStatus status={order?.status} />
                <IconButton
                  onClick={() => {
                    handleClickOpen(order);
                  }}
                  sx={{ height: 30, width: 30 }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Typography
                sx={{
                  mb: 2,
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                MINI FOOD
              </Typography>
              <Typography sx={{ fontStyle: "italic", mb: 2, fontSize: 13, fontWeight: 500 }}>
                12 Lý Thường Kiệt, Quận 11, TpHCM
              </Typography>
              <Typography sx={{ fontStyle: "italic", mb: 2, fontSize: 13, fontWeight: 500 }}>
                Tel: (+84) 368634491
              </Typography>
              <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
              <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                CodeID: {order?._id}
              </Typography>

              <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                Buyer Name: {order?.name}
              </Typography>

              <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                Address Shiping: {order?.addressShiping}
              </Typography>

              <Typography sx={{ mb: 2, fontSize: 13, fontWeight: 600 }}>
                Phone: {order?.phone}
              </Typography>

              <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
              {order.products.map((product) => (
                <>
                  <Typography sx={{ fontSize: 13, mb: 2, fontWeight: 600 }}>
                    Product: {product?.product.productName}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <span>Price:</span>
                    <span>{fCurrency(product?.product.price)} </span>
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <span>Amount:</span>
                    <span>{product?.amount}</span>
                  </Typography>

                 
                </>
              ))}
              <Typography
                sx={{
                  fontSize: 15,
                  mb: 1,
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <span>Total price:</span>
                <span style={{ color: "red" }}>{fCurrency(order?.total)} </span>
              </Typography>
              <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

              <Typography
                sx={{ fontStyle: "italic", fontSize: 12, fontWeight: 300 }}
              >
                (Share opinions with us minifood.com.vn)
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default OrderListDas;
