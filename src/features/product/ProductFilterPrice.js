// material
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FRadioGroup } from "../../components/form";
import Iconify from "../../components/Iconify/Iconify";
import { handleClearFilters } from "./productSlice";

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $6" },
  { value: "between", label: "Between $6 - $10" },
  { value: "above", label: "Above $10" },
];

const defaultValues = {
  price: "",
};

export default function ProductFilterPrice({ handleDispatch }) {
  const { filters } = useSelector((state) => state?.product);
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { handleSubmit, reset, watch } = methods;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!filters.sortBy) {
      reset();
    }

    const subscription = watch((value) => handleDispatch(value));
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  const onSubmit = (data) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ p: 2, width: 250 }}>
        <Stack spacing={1} sx={{ mb: 1 }}>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: { xs: 15, md: 17, lg: 18 },
//               textAlign: "center",
            }}
          >
            Price
          </Typography>
          <Stack spacing={1}>
            <FRadioGroup
              name="sortBy"
              options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
              getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
            />
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: "dashed", mb: 1 }} />
      <Box sx={{ p:2, textAlign:"center"}}>
        <Button
          size="large"
          type="submit"
          color="primary"
          variant="outlined"
          startIcon={<Iconify icon="ic:round-clear-all" />}
          onClick={() => {
            reset();
            dispatch(handleClearFilters());
          }}
        >
          Clear All
        </Button>
      </Box>

    </FormProvider>
  );
}
