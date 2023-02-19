// material
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  Box,
  Button,
  Divider,
  InputAdornment,

  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FSelect } from "../../components/form";
import Iconify from "../../components/Iconify/Iconify";
import { handleClearFilters } from "./productSlice";



export const FILTER_STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "Top", label: "Top" },
  { value: "New", label: "Newest" },
  { value: "Discount", label: " Discount" },
];

const defaultValues = {
  sortBy: "",
};


export default function ProductFilterStatus({ handleDispatch }) {
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

  const onSubmit = (data) => {}

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ p: 3, width: 200 }}>
        <Stack spacing={1} sx={{mb:6}}>
          <Typography
            sx={{
              color:"primary.main",
              fontSize: { xs: 15, md: 17, lg: 18 },
              
              textAlign: "center",
            }}
          >
            Product
          </Typography>
          <FSelect
            name="sortBy"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltOutlinedIcon />
                </InputAdornment>
              ),
            }}
          >
            {FILTER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} sx={{ p: 4 }}>
                {option.label}
              </option>
            ))}
          </FSelect>
        </Stack>


      </Stack>
      <Divider sx={{ borderStyle: "dashed", mb: 1 }} />
      <Box sx={{ p: 3 }}>
        <Button
          //             fullWidth
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
