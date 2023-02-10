import { Box, Typography } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";


const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ products, page }) => {
  const navigate = useNavigate();
  const items = products.map((item) => (
    <Box className="carouselItem">
      <Box
      component="img"
        sx={{
          width: 150,
          height: 120,
          mt: 1,
          borderRadius: 2,
          border: "3px solid #fff",
        }}
        
        src={item.image[1] || item.image[0]}
        alt={item.productName}
        onDragStart={handleDragStart}
        className="carouselItem__img"
        onClick={() => navigate(`/products/public/${item._id}`)}
      />
      <Typography
      sx={{
        mt:1,
        mb:2,
        textAlign:"center",
        fontWeight:500,
        fontFamily: "Comic Sans MS"
      }}
      >{item.productName}</Typography>
    </Box>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Carousel;
