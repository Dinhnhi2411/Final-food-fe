import React, { createContext, useState } from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { Box, Stack, Switch } from "@mui/material";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/alertMsg/AlertMsg";

export const ThemeContext = createContext(null);

function MainLayout() {
  // SETUP DARK MODE AND LIGHT MODE

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Stack
        id={theme}
        sx={{ width: "100wh", minHeight: "100vh", backgroundColor: "#F4F6F8" }}
      >
        <MainHeader />
        <AlertMsg />
        
        <Box sx={{ m: 2 }} className="switch">
          <label> {theme === "light" ? "Dark Mode" : "Light Mode"}</label>
          <Switch
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </Box>
        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </ThemeContext.Provider>
  );
}

export default MainLayout;
