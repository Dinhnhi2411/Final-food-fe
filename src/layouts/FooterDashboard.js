import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FooterDashboard() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright © "}
      <Link color="inherit" to="#">Dinh Ngoc Lien Nhi</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default FooterDashboard;
