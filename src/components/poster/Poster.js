import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Poster() {
  const navigate = useNavigate();
  return (
    <div id="poster">
      <div className="box-left">
        <Typography
          sx={{
            fontSize: { xs: 20, md: 30, lg: 43 },
            mt: 12,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          ORGANIC
          <br />
          FOODS
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 18, lg: 20 },
            color: "#D0D0D0",
          }}
        >
          Specializing in providing organic food to users, serving users in the most perfect way.
        </Typography>
        <button onClick={() => navigate("/store")}>Buy Now</button>
      </div>

      <div className="box-right">
        <Box
          sx={{
            width: { sx: "50px", md: "100px", lg: "150px" },
            height: "50%",
          }}
          component="img"
          src="./poster/poster_1.jpg"
        ></Box>
        <Box
          sx={{
            width: { sx: "50px", md: "100px", lg: "150px" },
            height: "50%",
          }}
          component="img"
          src="./poster/poster_2.jpg"
        ></Box>
        <Box
          sx={{
            width: { sx: "50px", md: "100px", lg: "150px" },
            height: "50%",
          }}
          component="img"
          src="./poster/poster_3.jpg"
        ></Box>
      </div>
      <div className="to-bottom">
        <ExpandMoreIcon size="large" />
      </div>
    </div>
  );
}

export default Poster;
