import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/alertMsg/AlertMsg";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FooterDashboard from "./FooterDashboard";
import HeaderDashboard from "./HeaderDasboard";

const APP_BAR_MOBILE = 40;
const APP_BAR_DESKTOP = 80;

const RootStyle = styled("span")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  backgroundColor: "#F4F6F8",
}));

const MainStyle = styled("span")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100vh",
  paddingTop: APP_BAR_MOBILE + 30,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle direction="row">
      <AlertMsg />

      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Stack direction="column" sx={{width: "100wh", minHeight: "100vh"}}>
          <HeaderDashboard onOpenSidebar={() => setOpen(true)} />
          <Outlet />
          <Box sx={{ flexGrow: 1 }} />
          <FooterDashboard />
        </Stack>
      </MainStyle>
    </RootStyle>
  );
}
