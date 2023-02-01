import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "./logo.png";
function Logo({ disableLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 50, height: 50, ...sx, }}>
      <img src={logoImg} alt="logo" width="100%"/>
    </Box>
  );
  if (disableLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/"> {logo} </RouterLink>;
}
export default Logo;
