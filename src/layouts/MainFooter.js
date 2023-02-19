import React from "react";
import { Divider, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

function MainFooter() {
  return (
    <>
    <Box sx={{ minHeight: 250, backgroundColor: "#000" }}>
    <Divider sx={{ borderStyle: "dashed", mb: 1 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ color: "#fff", m: 1 }}>
          <Typography
            sx={{
              mt: 3,
              backgroundColor: "#000",
              fontSize: { xs: 16, md: 17, lg: 25 },
              lineHeight: 2,
              fontFamily: "Comic Sans MS",
            }}
          >
            MiniFood
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 16, lg: 17 },

              mb: 1,
            }}
          >
            🏠 Address: 12 Lý Thường Kiệt, Quận 11, TpHCM
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 16, lg: 17 },

              mb: 1,
            }}
          >
            📞 Hotline: 0368634491
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 16, lg: 17 },

              mb: 1,
            }}
          >
            💌 Email: minifood@gmail.com
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 16, lg: 17 },
            }}
          >
            🔔 Fanpage: minifood
          </Typography>
        </Box>

        <Box p={1} mt={3}>
          <Typography
            pb={1}
            sx={{
              fontSize: { xs: 14, md: 16, lg: 17 },
              color: "#fff",
              textAlign: "center",
            }}
          >
            Delivery & Payments
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="./delivery/1.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="./delivery/2.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="./delivery/3.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="./delivery/4.png"
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          p={1}
          textAlign="center"
        >
          {"Copyright © "}
          <Link color="inherit" to="#">
            Dinh Ngoc Lien Nhi
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Box>
    </>
  );
}

export default MainFooter;
