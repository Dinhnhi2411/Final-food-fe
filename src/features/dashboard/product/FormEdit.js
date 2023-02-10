import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import useAuth from "../../../hooks/useAuth";
import { editProduct, getProducts } from "../../product/productSlice";
import {
  FormProvider,
  FSelect,
  FTextField,
  FUploadImage,
} from "../../../components/form";

const UpdateProductSchema = yup.object().shape({
  productName: yup.string().required("productName is required"),
  types: yup.string().required("types is required"),
  price: yup.number().required("price is required"),
  priceSale: yup.number().required("priceSale is required"),
  unit: yup.string().required("unit is required"),
  description: yup.string().required("description is required"),
});

export default function FormEdit({ product, handleClose }) {
  const { isLoading } = useSelector((state) => state.product);

  const id = product._id;
  const { user } = useAuth();

  const defaultValues = {
    productName: product?.productName || "",
    types: product?.types || "",
    status: product?.status || "",
    price: product?.price || null,
    priceSale: product?.priceSale || null,
    unit: product?.unit || "",
    image: product?.image?.[0] || null,
    description: product?.description || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    const page = 1;
    dispatch(editProduct({ id, ...data }));
    setTimeout(() => {
      dispatch(getProducts({ id: user._id, page }));
    }, 700);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="productName" label="Product Name" />
              <FSelect
                name="types"
                label="Types"
                size="small"
                sx={{ xs: 200, md: 300 }}
              >
                {[
                  { value: "Fruit", label: "Fruit" },
                  { value: "Vegetable", label: "Vegetable" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
               <FSelect
                name="status"
                label="Status"
                size="small"
                sx={{ xs: 200, md: 300 }}
              >
                {[
                  { value: "Normal", label: "Normal" },
                  { value: "Discount", label: "Discount" },
                  { value: "New", label: "New" },
                  { value: "Top", label: "Top" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>

              <FTextField name="price" label="Price" />
              <FTextField name="priceSale" label="Price Sale" />
              <FTextField name="unit" label="Unit" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FTextField name="description" multiline label="Description" />
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          sx={{}}
          onClick={handleClose}
          type="submit"
          loading={isSubmitting || isLoading}
        >
          Save Changes
        </LoadingButton>

        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </FormProvider>
  );
}
