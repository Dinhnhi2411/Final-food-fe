import { Box, CircularProgress } from "@mui/material";
import React from "react";
import "./LoadingScreen.css"

function LoadingScreen() {
    return (
        <Box id="preloader">
            <Box
            id="loader"
            >

            </Box>
              </Box>
    );
}

//             sx={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//    <CircularProgress color="warning" />
    
           



export default LoadingScreen;