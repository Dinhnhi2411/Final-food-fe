import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { fDate } from "../../../utils/formatTime";
import { fCurrency } from "../../../utils/numberFormat";
import { Link } from "react-router-dom";
import { getOrdersDashboard } from "../../order/orderSlice";
import ButtonStatus from "../order/ButtonStatus";
import { toast } from "react-toastify";
import OrderUpdateStatus from "../order/OrderUpdateStatus";

export default function LastOrders(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orders, setOders] = useState([]);
  const {  ordersDashboard } = useSelector((state) => state.order);

  useEffect(() => {
    const filters = { sortBy: "createdAt.desc" };
    dispatch(getOrdersDashboard(filters));
  }, [dispatch]);

    const handleClickOpen = (order) => {
    if(order.status === "Delivered") {
      toast("You can't update, order delivered")
    }else{
    setOders(order);
    console.log(order)
    setOpen(true);
    }
  }

  return (
    <Card>
     <OrderUpdateStatus orders={orders} setOpen={setOpen} open={open} />

      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Table sx={{ minWidth: 800}}>
          <TableHead>
            <TableRow>
              <TableCell>Code ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">
                {/* <Tooltip enterDelay={300} title="Sort"> */}
                  <TableCell>
                    Date
                  </TableCell>
                {/* </Tooltip> */}
              </TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { ordersDashboard?.map((order) => {
              order.products.map((item)=> {
                return item;
              })
            
              return (
              <TableRow hover key={order?._id} >
                <TableCell>{order?._id}</TableCell>
                <TableCell>{order?.name}</TableCell>
                <TableCell>
                  {order.createdAt && fDate(order.createdAt, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {fCurrency(order.total)}
                </TableCell>
                <TableCell>

                  <ButtonStatus 
                  status={order.status}
                  onClick={()=> {
                    handleClickOpen(order)
                  }}
                  />
                
                </TableCell>
              </TableRow>
              )
           })}

          </TableBody>
        </Table>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          component={Link}
          to={`/dashboard/order`}
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>

  );
  
}
