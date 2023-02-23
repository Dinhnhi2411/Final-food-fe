import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import GradingIcon from "@mui/icons-material/Grading";
import { fCurrency } from "../../utils/numberFormat";
import ButtonStatus from "../dashboard/order/ButtonStatus";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fDate } from "../../utils/formatTime";

function OrderList({ orders }) {
  return (
    <Container>
      <Box>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <GradingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Order will be delivered soon"
            secondary="Order Sucess"
          />
        </ListItem>
      </Box>

      <Box>
        <Typography
          sx={{
            m: 1,
            fontSize: { xs: 20, md: 25, lg: 30 },
          }}
        >
          Your Information Order
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} mt={1} mb={2}>
          {orders?.map((item) => {
            item?.products?.map((product) => {
              return product;
            });
            return (
              <Grid key={item._id} item xs={6} sm={6} md={4} lg={3}>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box sx={{ 
                      mb: 2,
                       color: "#000",
                          }}>
                      <ButtonStatus status={item?.status} />
                      <Typography sx={{ fontStyle: "italic", mt:1, mb:1}}>
                        {item?.createdAt && fDate(item?.createdAt, "dd/MM/yyyy")}
                      </Typography>
                      <Typography>Detail Information</Typography>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    {item?.products?.map((product) => (
                      <Box key={product._id}>
                       <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                        <Typography sx={{color: "#000"}} >
                          Product: {product?.product?.productName}
                        </Typography>
                        <Typography sx={{color: "#000"}} >
                          Price: {fCurrency(product?.product?.price)}
                        </Typography>
                        <Typography sx={{color: "#000"}} >Amount: {product?.amount}</Typography>
                        <Typography sx={{color: "#000"}} >Total: {fCurrency(product?.sum)}</Typography>
                        <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                      </Box>
                    ))}

                    <Typography>
                      Price Ship: {fCurrency(item.priceShip)}
                    </Typography>
                    <Typography
                      sx={{ color: "red", fontSize: 18, fontWeight: 600 }}
                    >
                      Total Price: {fCurrency(item?.total)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
}

export default OrderList;
