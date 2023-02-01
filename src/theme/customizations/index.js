import { alpha } from "@mui/material";
import { styled } from "@mui/system";

export const TitleStyle = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(
    theme.palette.primary.main,
    theme.palette.action.selectedOpacity
  ),
  color: theme.palette.primary.main,
}));
