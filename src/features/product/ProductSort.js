// material
import SortIcon from "@mui/icons-material/Sort";
import { InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormProvider, FSelect } from "../../components/form";

export const SORT_BY_OPTIONS = [
  { value: "", label: "Sort" },
  { value: "Normal", label: "Product Normal" },
  { value: "Top", label: "Product Top" },
  { value: "New", label: "Product Newest" },
  { value: "Discount", label: "Product Discount" },
];

const defaultValues = {
  sortBy: "",
};
export default function ProductSort({ handleDispatch }) {
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
  
  const onSubmit = (data) => console.log("data", data);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FSelect
        name="sortBy"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SortIcon />
            </InputAdornment>
          ),
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} sx={{ p: 4,  }}>
            {option.label}
          </option>
        ))}
      </FSelect>
    </FormProvider>
  );
}
