// material
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import {
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { FormProvider, FSelect } from "../../components/form";

export const FILTER_TYPES_OPTIONS = [
  { value: "", label: "All" },
  { value: "Fruit", label: "Fruit" },
  { value: "Vegetable", label: "Vegetable" },

];


const defaultValues = {
  sortBy: "",
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
      <Stack  sx={{ p: 3, width: 200 }}>
        <Stack spacing={1} sx={{mb:4}}>
          <Typography
            sx={{
              color:"primary.main",
              fontSize: { xs: 15, md: 17, lg: 18 },
              
              textAlign: "center",
            }}
          >
            Types
          </Typography>
          <FSelect
            name="sortBy"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltOutlinedIcon/>
                </InputAdornment>
              ),
            }}
          >
            {FILTER_TYPES_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} sx={{ p: 4 }}>
                {option.label}
              </option>
            ))}
          </FSelect>
        </Stack>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />

    </FormProvider>
  );
}
