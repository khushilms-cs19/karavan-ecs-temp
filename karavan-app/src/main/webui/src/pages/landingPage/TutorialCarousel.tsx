import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "mui-image";
import createProject from '../../resources/createProject.png';
import createProjectFiles from '../../resources/createProjectFiles.png';
import integrationPage from '../../resources/integrationPage.png';

interface ItemProps {
  title: string;
  description: string;
  image: string;
}

function Item({ title, description, image }: ItemProps) {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        textAlign: "left",
        boxShadow: 1,
        position: "relative",
      }}
    >
      <Image
        src={image}
        height="100%"
        width="100%"
        fit="cover"
        duration={0}
        errorIcon
        shift={null}
        shiftDuration={900}
        showLoading
        easing="ease-in-out"
        style={{
          position: "relative",
          top: 0,
          left: 0,
        }}
      />
      <Box
        component="p"
        sx={{
          fontSize: isLargeScreen ? 23 : 20,
          // color: "text.primary",
          width: "100%",
          padding: 2,
          margin: 0,
          backgroundColor: "#4d4b4b",
          color: "#fefefe",
          opacity: 0.9,
          position: isLargeScreen ? "absolute" : "relative",
          top: 0,
          left: 0,
        }}
      >
        {title}
      </Box>
      {isLargeScreen && (
        <Box
          component="p"
          sx={{
            fontSize: isLargeScreen ? 20 : 18,
            color: "#fefefe",
            backgroundColor: "#4d4b4b",
            width: "100%",
            padding: 2,
            bottom: 0,
            position: "absolute",
            opacity: 0.9,
            margin: 0,
          }}
        >
          {description}
        </Box>
      )}
    </Box>
  );
}

function ImageCarousel() {
  const [firstImgLoaded, setFirstImgLoaded] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amety ✅',
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: createProject,
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet 📌',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: createProjectFiles,
      },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet",
      description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: integrationPage,
    },
  ];

  return (
    <>
      <img
        alt="hack"
        src={slides[0].image}
        onLoad={() => setFirstImgLoaded(true)}
        style={{ display: "none" }}
      />
      {firstImgLoaded && (
        <Carousel
          autoPlay={true}
          animation="fade"
          indicators
          swipe={false}
          navButtonsAlwaysVisible={false}
          cycleNavigation
          fullHeightHover={false}
          navButtonsProps={{
            style: {
              borderRadius: "50%",
              marginInline: 10,
              width: 30,
              height: 30,
              zIndex: 2,
              opacity: 0.4,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#fefefe",
              transform: "scale(1.5)",
            },
          }}
          indicatorContainerProps={{
            style: {
              position: "absolute",
              bottom: "0.2%",
              zIndex: 2,
            },
          }}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            boxShadow: 1,
          }}
        >
          {slides.map((slide) => (
            <Item
              key={slide.id}
              title={slide.title}
              description={slide.description}
              image={slide.image}
            />
          ))}
        </Carousel>
      )}
    </>
  );
}

export default ImageCarousel;
