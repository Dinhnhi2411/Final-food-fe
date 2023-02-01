import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { fCurrency } from "../../utils/numberFormat";
import ButtonStatus from "../dashboard/order/ButtonStatus";

function OrderList({ orders }) {
  return (
    <Container>
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Order Success
        </Typography>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Inventory2Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Order will be delivered soon"
            secondary="Order Sucess"
          />
        </ListItem>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ mt: 1 }}>
          Your Information Order
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} mt={1} mb={2}>
          {orders?.map((item) => {
            item.products.map((product) => {
              return product;
            });
            return (
              <Grid key={item._id} item xs={12} md={4} lg={3}>
                <Card sx={{ p: 3, mt: 1, mr: 2, minHeight: 470 }}>
                  <Box sx={{ mb: 2 }}>
                    <ButtonStatus status ={item?.status} />
                  </Box>

                  <Typography>Name : {item.name}</Typography>
                  <Typography>Address Ship: {item.addressShip}</Typography>
                  <Typography>Phone: {item.phone}</Typography>
                  <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                  {item.products.map((product) => (
                    <Box key={product._id}>
                      <Typography>
                        Product: {product.product.productName}
                      </Typography>
                      <Typography>
                        Price: {fCurrency(product.product.price)}
                      </Typography>
                      <Typography>Amount: {product.amount}</Typography>
                      <Typography>Total: {fCurrency(product.sum)}</Typography>
                      <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                    </Box>
                  ))}

                  <Typography>
                    Price Ship: {fCurrency(item.priceShip)}
                  </Typography>
                  <Typography sx={{ color: "red", fontSize: 18 }}>
                    Total Price: {fCurrency(item.total)}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
}

export default OrderList;
