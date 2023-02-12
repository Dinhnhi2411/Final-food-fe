import { Box } from "@mui/material";
import React from "react";

function Sale() {
  return (
    <Box
      id="sale"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column", lg: "row" },
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <img width={500} heigth={500} src="./images/1.png" alt="" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img width={250} height={240} src="./images/2.png" alt="" />

        <img width={250} height={240} src="./images/3.png" alt="" />
      </Box>
      <img width={250} height={500} src="./images/4.png" alt="" />
    </Box>
  );
}

export default Sale;
