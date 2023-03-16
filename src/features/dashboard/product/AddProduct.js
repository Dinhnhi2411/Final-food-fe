import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useAuth from "../../../hooks/useAuth";
import { createProduct, getProducts } from "../../product/productSlice";
import { fData } from "../../../utils/numberFormat";
import { FormProvider, FSelect, FTextField, FUploadImage } from "../../../components/form";
import { useNavigate } from "react-router-dom";

const CreateProductSchema = yup.object().shape({
  productName: yup.string().required("productName is required *"),
  types: yup.string().required("types is required *"),
  status: yup.string().required("status is required *"),
  price: yup.number().required("price is required *"),
  unit: yup.string().required("unit is required *"),
  description: yup.string().required("description is required *"),
});

const defaultValues = {
  productName: "",
  types: "",
  price: "",
  priceSale: "",
  unit: "",
  image: null,
  description: "",
};

function AddProduct() {
  const { isLoading } = useSelector((state) => state.product);
  const { user } = useAuth();
  const navigate = useNavigate()
  const methods = useForm({
    resolver: yupResolver(CreateProductSchema),
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
    const {
      productName,
      types,
      status,
      price,
      priceSale,
      unit,
      description,
      image,
    } = data;
    const page = 1;

    dispatch(
      createProduct({
        productName,
        types,
        status,
        price,
        priceSale,
        unit,
        description,
        image,
      })
    );

    dispatch(getProducts({ id: user._id, page }));
    dispatch(getProducts({ page }));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 3, mr: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: 16, md: 28 }, fontWeight: 600 }}
        >
          Add Product
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
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
                  { value: "", label: "" },
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
                  { value: "", label: "" },
                 
                  { value: "New", label: "New" },
                  { value: "Top", label: "Top" },
                  { value: "Discount", label: "Discount" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>

              <FTextField name="price" label="Price" />
              <FTextField name="priceSale" label="Price Saler" />
              <FTextField name="unit" label="Unit" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 10 }}>
              <FTextField name="description" multiline rows={4} label="Description" />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Create Product
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ height: 15 }} />
    </FormProvider>
  );
}

export default AddProduct;
