import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { banner } from "../../data/Data";
import "./Banner.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SmoothHorizontalScrolling } from "../../utils";

function Banner(props) {
  const sliderRef = useRef();
  const bannerRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        bannerRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };
  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -bannerRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };

    useEffect(()=> {
  if (isDrag) {
    if(dragMove < dragDown) handleScrollRight();
    if(dragMove >  dragDown) handleScrollLeft();
  }
    },[dragDown, dragMove, isDrag])
      const onDragStart = e => {
        setIsDrag(true);
        setDragDown(e.screenX);

      }
      const onDragEnd = e => {
        setIsDrag(false);
      }
      const onDragEnter = e => {
        setDragMove(e.screenX);
      }

  return (
    <>
      <BannerContainer draggable="false">
        
        <BannerSlider
          ref={sliderRef}
          draggable="true"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
        >
          {banner.map((items, index) => (
            <Stack
              key={items.id}
              className="bannerItems"
              ref={bannerRef}
              draggable="false"
            >
              <img key={items.id} src={items.cover} alt="" draggable="false" />
            </Stack>
          ))}
        </BannerSlider>
        <ArrowLeftIcon className="btnLeft" onClick={handleScrollLeft} />
        <ArrowRightIcon className="btnRight" onClick={handleScrollRight} />
      </BannerContainer>
    </>
  );
}
export default Banner;

const BannerContainer = styled.span`
  background-color: var(--color-background);
  color: var(--color-white);
  margin-top: 18px;
  position: relative;
  width: 100%;
  hight: 100%;

  .btnLeft {
    position: absolute;
    top: 50%;
    left: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 80px;
    width: 35px;
    color: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s linear;
    }
  }
  .btnRight {
    position: absolute;
    top: 50%;
    right: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 80px;
    width: 35px;
    color: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s linear;
    }
  }
`;
const BannerSlider = styled.span`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(${banner.length}, 450px);
  transition: all0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  scroll-behavior: smooth;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(${banner.length}, 300px);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(${banner.length}, 250px);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(${banner.length}, 200px);
  }
  &:hover .bannerItems {
    opacity: 0.5;
  }

  .bannerItems {
    transform: scale(1);
    max-width: 500px;
    max-height: 400px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center left;
    positon: relative;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
      z-index: 10;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
