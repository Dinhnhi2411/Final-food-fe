import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProductDes from "./ProductDes";
import ProductReviews from "./ProductReviews";

function ProductTabs({ product }) {
  const { user } = useAuth();
  const { id: productId } = useParams();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",

            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Discription"
              value="1"
              sx={{
                fontSize: { xs: 14, md: 18, lg: 19 },
                fontFamily: "Comic Sans MS",
              }}
            />
            <Tab
              label="Reviews"
              value="2"
              sx={{
                fontSize: { xs: 14, md: 18, lg: 19 },
                fontFamily: "Comic Sans MS",
              }}
            />
          </TabList>
        </Box>

        <TabPanel value="1">
          <ProductDes product={product} />
        </TabPanel>
        <TabPanel value="2">
          <ProductReviews productId={productId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProductTabs;
