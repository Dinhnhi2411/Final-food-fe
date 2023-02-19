import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { getOrdersDashboard, updateOrder } from "../../order/orderSlice";
import { LoadingButton } from "@mui/lab";
import { FormProvider, FSelect } from "../../../components/form";
import { Box } from "@mui/system";

const UpdateStatusSchema = yup.object().shape({
  status: yup.string().required("status is required"),
});
function OrderForm({ orders, handleClose }) {
  const { isLoading } = useSelector((state) => state.order);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userId = user._id;
  const id = orders._id;
  const defaultValues = {
    status: orders?.status || "",
  };
  const methods = useForm({
    resolver: yupResolver(UpdateStatusSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    const { status } = data;
    const page = 1;
    dispatch(updateOrder({ id: id, status: status }));
    setTimeout(() => {
      dispatch(getOrdersDashboard({ page, userId }));
    }, 700);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid key={orders?._id} item xs={12} md={12} lg={3}>
        <Typography sx={{ mb: 2 }}>codeID: ({orders?._id})</Typography>
        <FSelect
          name="status"
          label="status"
          size="small"
          sx={{ xs: 200, md: 300 }}
        >
          {[
            { value: "", label: "" },
            { value: "Preparing Order", label: "Preparing Order" },
            { value: "Order is shipping", label: "Order is shipping" },
            { value: "Delivered", label: "Delivered" },
            { value: "Cancel", label: "Cancel" },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FSelect>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          sx={{}}
          onClick={handleClose}
          type="submit"
          loading={isSubmitting || isLoading}
        >
          Save
        </LoadingButton>

        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </FormProvider>
  );
}

export default OrderForm;
