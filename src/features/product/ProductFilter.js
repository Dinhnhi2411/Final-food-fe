import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FMultiCheckbox from "../../components/form/FMultiCheckbox";
import FRadioGroup from "../../components/form/FRadioGroup";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const FILTER_TYPES_OPTIONS = ["Fruit", "Vegetable"];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below 40000VNĐ" },
  { value: "between", label: "Between 40000VND - 65000VNĐ" },
  { value: "above", label: "Above 65000VNĐ" },
];

function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Types
        </Typography>
        <FMultiCheckbox
          name="types"
          options={FILTER_TYPES_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
