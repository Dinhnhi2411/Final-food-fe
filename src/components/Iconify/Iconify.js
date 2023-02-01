import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

export default function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}