import React, { createContext, useState } from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { Box, Stack, Switch } from "@mui/material";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/alertMsg/AlertMsg";

export const ThemeContext = createContext(null);

function MainLayout() {
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
        <span className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <Switch
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </span>
        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </ThemeContext.Provider>
  );
}

export default MainLayout;
