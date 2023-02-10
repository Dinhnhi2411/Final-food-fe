import { Button } from "@mui/material";
import React from "react";

function ButtonStatus({ status }) {

  const btnDelivered = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="success"
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
    >
      Preparing Order
    </Button>
  );

    const btnCancel = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="primary"
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