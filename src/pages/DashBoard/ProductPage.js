import { Box, Stack, Typography } from "@mui/material";
import { TitleStyle } from "../../theme/customizations/TitleStyle";
import CategoryIcon from "@mui/icons-material/Category";
import ProductTable from "../../features/dashboard/product/ProductTable";

function ProductPage(props) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" sx={{ py: 2 }}>
        <TitleStyle>
          <CategoryIcon sx={{ width: "35px", height: "35px" }} />
          <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
            Product
          </Typography>
        </TitleStyle>
      </Stack>
      <ProductTable />
    </Box>
  );
}

export default ProductPage;
