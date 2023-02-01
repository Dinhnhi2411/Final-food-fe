import React from "react";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

function MainFooter() {
  return (
    <Box sx={{ height: 150, background: "white" }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: { xs: "column",md: "column", lg: "row" },
          justifyContent: "space-around",
        }}
      >
        <Box>
          <Box m={2}>
            <Typography
              sx={{
                backgroundColor: "#fff",
                fontSize: { xs: 16, md: 18, lg: 25 },
                lineHeight: 3,
                fontFamily: "Comic Sans MS",
              }}
            >
              MiniFood
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                }}
              >
                🏠 Address: 12 Lý Thường Kiệt, Quận 11, TpHCM
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                }}
              >
                📞 Hotline: 0368634491
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                }}
              >
                💌 Email: minifood@gmail.com
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16, lg: 18 },
                }}
              >
                🔔 Fanpage: minifood
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box p={1} m={1} >
          <Typography pb={1} sx={{ fontSize: { xs: 14, md: 16, lg: 18 } }}>
            Delivery & Payments
          </Typography>
          <Box
          sx={{
            display:"flex",
            flexDirection:"row"
          }}
          >
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="https://home.ahamove.com/wp-content/uploads/2020/10/BrandingLogomoi-01.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="https://assets.grab.com/wp-content/uploads/sites/12/2021/09/16211148/Motorbike-1.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/f/fe/MoMo_Logo.png/220px-MoMo_Logo.png"
            />
            <img
              style={{ width: 90, height: "100%" }}
              alt=""
              src="https://play-lh.googleusercontent.com/yHmIm7FYKe_dW2WHTwWizp2p_gt7_ctdpCUevX654E1dsj5c9McWO03k_S6PPLG_DNz7"
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
          <Link color="inherit" to="#">Dinh Ngoc Lien Nhi</Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Box>
  );
}

export default MainFooter;
