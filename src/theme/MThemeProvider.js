import { alpha, createTheme, CssBaseline } from "@mui/material";
import {  ThemeProvider } from "@mui/material/styles";

import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#FFE6EA",
  light: "#F7B0AA",
  main: "#FF8095",
  dark: "#CC0022",
  darker: "#660011",
  contrastText: "#FFF",
};
const SECONDARY = {
  maxlighter: "#E6FFFF",
  lighter: "#80deea",
  light: "#00acc1",
  main: "#0097a7",
  dark: "#00838f",
  darker: "#006064",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#a5d6a7",
  light: "#43a047",
  main: "#388e3c",
  dark: "#2e7d32",
  darker: "#1b5e20",
  contrastText: "#FFF",
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: "#FFF",
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};
const ADDINS = {
  lighter: "#CCFF99",
  light: "#98FF02",
  main: "#84DE02",
  dark: "#579101",
  darker: "#2C4A01",
};
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};
function MThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      addins: ADDINS,
      grey: GREY,
      warning: WARNING,
      info: INFO,
      divider: alpha(GREY[500], 0.24),
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
      shape: { borderRadius: 8 },
      zIndex: {
        tooltip: 999999,
      },
       background: {
      paper: '#fff',
      default: GREY[100],
      neutral: GREY[200],
      },
      text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    },
  };

  const theme = createTheme(themeOptions);
  // theme.components = customizeComponents(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MThemeProvider;
