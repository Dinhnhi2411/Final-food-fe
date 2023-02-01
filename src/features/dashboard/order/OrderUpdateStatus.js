import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import OrderForm from "./OrderForm";

function OrderUpdateStatus({ orders, setOpen, open }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Status Order</DialogTitle>
      <DialogContent>
        <OrderForm orders={orders} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default OrderUpdateStatus;
