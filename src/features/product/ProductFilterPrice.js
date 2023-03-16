// material
import {  Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {  useSelector } from "react-redux";
import { FormProvider, FRadioGroup } from "../../components/form";

export const FILTER_PRICE_OPTIONS = [
  { value: "All", label: "All Price" },

  { value: "Below", label: "Below $6" },

  { value: "Between", label: "Between $6 - $10" },

  { value: "Above", label: "Above $10" },
];

const defaultValues = {
  sortBy: "All",
};

export default function ProductFilterPrice({ handleDispatch }) {
  const { filters } = useSelector((state) => state?.product);
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { handleSubmit, reset, watch } = methods;

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

     
    </FormProvider>
  );
}
