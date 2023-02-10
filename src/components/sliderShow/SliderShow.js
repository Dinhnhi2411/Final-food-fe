import { Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import apiService from "../../app/apiService";

import "./sliderShow.css";

function SliderShow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [slider, setSlider] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  useEffect(() => {
    const getSingleProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/sliders`);

        setSlider(res.data.Sliders);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getSingleProducts();
    // eslint-disable-next-line
  }, []);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slider.length - 1 ? 0 : prevIndex + 1
        ),
      6000
    );
    return () => {
      resetTimeout();
    };
    // eslint-disable-next-line
  }, [slider, index]);

  return (
    <Box className="slideshow">
      <Box
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slider.map((item, index) => (
          <img key={item._id} className="slide" src={item.sliderShow} alt="" />
        ))}
      </Box>

      <Box className="slideshowDots">
        {slider.map((i, idx) => (
          <Box
            key={idx}
            className={`slideshowDot ${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          >

          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SliderShow;

