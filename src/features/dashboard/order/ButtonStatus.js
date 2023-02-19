import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

function ButtonStatus({ status, onClick }) {

  const btnDelivered = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="success"
    
      onClick={onClick}
    >
      Delivered
    </Button>
  );

  const btnShipping = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
      Order is shipping
    </Button>
  );
  const btnPreparingOrder = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="warning"
      onClick={onClick}
    >
      Preparing Order
    </Button>
  );

    const btnCancel = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      disabled
     
    >
      Cancel
    </Button>
  );

  if (status === "Preparing Order") { return btnPreparingOrder }
  if (status === "Order is shipping") { return btnShipping }
  if (status === "Delivered") { return btnDelivered }
  if (status === "Cancel") { return btnCancel }

}

export default ButtonStatus;