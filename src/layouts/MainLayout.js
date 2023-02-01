import React from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/alertMsg/AlertMsg";

function MainLayout() {
  return (
    <Stack
      sx={{ width: "100wh", minHeight: "100vh", backgroundColor: "#F4F6F8" }}
    >
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
