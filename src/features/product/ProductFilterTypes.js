// material
import { Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FMultiCheckbox, FormProvider } from "../../components/form";

export const FILTER_TYPES_OPTIONS = ["Fruit", "Vegetable"];

const defaultValues = {
  types: "",
};

export default function ProductFilterTypes({ handleDispatch }) {
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
              // textAlign: "center",
            }}
          >
            Types
          </Typography>
          <FMultiCheckbox
            name="types"
            options={FILTER_TYPES_OPTIONS}
            sx={{ width: 1, color:"secondary" }}
          />
        </Stack>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
    </FormProvider>
  );
}
