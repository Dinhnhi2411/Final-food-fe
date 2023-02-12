import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Sale from "../sale/Sale";
import "./Demo.css";

function Demo() {
  return (
    <>
    <Divider
      className="title_demo"
      sx={{
          fontSize: { xs: 16, sm: 18, md: 20, lg: 35 },
          m:5
        }}
        >WELCOME TO OUR MINI FOOD !
        
    </Divider>
    <Sale/>
      <Box className="demo">
        <Box className="demo_card">
          <Paper>
            <Typography
              sx={{
                m: 1,
                fontSize: { xs: 15, md: 18, lg: 20 },
                fontWeight: 600,
                fontFamily: "Comic Sans MS",
              }}
            >
              HEALTHY FOOD GUIDE
            </Typography>
            <Typography
              sx={{
                m: 1,
                fontStyle: "italic",
              }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            </Typography>

            <Box
              className="img_demo"
              component="img"
              sx={{
                width: "100%wh",
                height: { xs: 100, md: 150, lg: 300 },
                ml: 1,
                mt: 1,
                borderRadius: 1,
              }}
              src="https://cdn.pixabay.com/photo/2017/03/31/18/02/strawberry-dessert-2191973__340.jpg"
              alt="product"
            />
          </Paper>
        </Box>

        <Box className="demo_card">
          <Paper>
            <Typography
              sx={{
                m: 1,
                fontWeight: 600,
                fontSize: { xs: 15, md: 18, lg: 20 },
                fontFamily: "Comic Sans MS",
              }}
            >
              FRESH FOOD DA LAT 
            </Typography>
            <Typography
              sx={{
                m: 1,
                fontStyle: "italic",
              }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            </Typography>
            <Box
              className="img_demo"
              component="img"
              sx={{
                width: "100%wh",
                height: { xs: 100, md: 150, lg: 300 },
                ml: 1,
                mt: 1,
                borderRadius: 1,
              }}
              src="https://cdn.pixabay.com/photo/2016/05/16/17/59/strawberries-1396330__340.jpg"
              alt="product"
            />
          </Paper>
        </Box>

        <Box className="demo_card">
          <Paper>
            <Typography
              sx={{
                m: 1,
                fontSize: { xs: 15, md: 18, lg: 20 },
                fontWeight: 600,
                fontFamily: "Comic Sans MS",
              }}
            >
              NATURAL & ORGANIC
            </Typography>
            <Typography
              sx={{
                m: 1,
                fontStyle: "italic",
              }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            </Typography>
            <Box
              className="img_demo"
              component="img"
              sx={{
                width: "100%wh",
                height: { xs: 100, md: 150, lg: 300 },
                ml: 1,
                mt: 1,
                borderRadius: 1,
              }}
              src="https://cdn.pixabay.com/photo/2015/10/28/22/27/plant-1011492__340.jpg"
              alt="product"
            />
          </Paper>
        </Box>

        <Box className="demo_card">
          <Paper>
            <Typography
              sx={{
                m: 1,
                fontWeight: 600,
                fontSize: { xs: 15, md: 18, lg: 20 },
                fontFamily: "Comic Sans MS",
              }}
            >
              DIVERSITY FOODS
            </Typography>
            <Typography
              sx={{
                m: 1,
                fontStyle: "italic",
              }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            </Typography>
            <Box
              className="img_demo"
              component="img"
              sx={{
                width: "100%wh",
                height: { xs: 100, md: 150, lg: 300 },
                ml: 1,
                mt: 1,
                borderRadius: 1,
              }}
              src="https://cdn.pixabay.com/photo/2018/05/30/16/23/fruits-3441830__340.jpg"
              alt="product"
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Demo;
