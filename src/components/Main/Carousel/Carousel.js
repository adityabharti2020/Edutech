import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircleIcon from "@mui/icons-material/Circle";
import { Grid, Stack } from "@mui/material";
const ImagesUrls = [
  {
    url: "https://venngage-wordpress.s3.amazonaws.com/uploads/2021/10/Email-Banner-Furniture-Sale.png",
    id: 1,
  },
  {
    url: "https://img.freepik.com/free-vector/gradient-boutique-design-template_23-2149348648.jpg",
    id: 2,
  },
  {
    url: "https://t4.ftcdn.net/jpg/02/24/88/07/360_F_224880717_YmNbocwrjak9AyvQ9QrTnELWCeOGtKvH.jpg",
    id: 3,
  },
  {
    url: "https://img.freepik.com/free-vector/gradient-supermarket-twitch-banner_23-2149387927.jpg?w=2000",
    id: 4,
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoacaqtVhfKtl0K8vLw6uBzqJI9CVW_w_tmznz4ZoaZiAgJ6dwXT-5tjcsFlaKGiS6PLA&usqp=CAU",
    id: 5,
  },
  {
    url: "https://img.freepik.com/premium-psd/horizontal-website-banne_451189-109.jpg",
    id: 6,
  },
  {
    url: "https://img.freepik.com/free-vector/flat-kids-twitch-banner-template_23-2149658118.jpg",
    id: 7,
  },
];

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(0);
  const leftSlideChangeHandler = () => {
    console.log("into left ");
    if (activeImage === 0) {
      return setActiveImage(6);
    }
    setActiveImage(activeImage - 1);
  };
  const rightSlideChangeHandler = () => {
    if (activeImage >= ImagesUrls.length - 1) {
      return setActiveImage(0);
    }
    setActiveImage(activeImage + 1);
  };
  useEffect(() => {
    // autoSlider();
    const timeId = setInterval(() => {
      if (activeImage >= ImagesUrls.length - 1) {
        return setActiveImage(0);
      }
      setActiveImage(activeImage + 1);
      // clearInterval(autoSlider);
    }, 3000);
    return () => {
      clearInterval(timeId);
    };
  }, [activeImage]);
  return (
    <>
      <Grid container>
        <Grid
          tems
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              top: { xs: "40%", md: 90 },
              left: { xs: 10, md: 50 },
              bgcolor: "white",
              borderRadius: "5px",
              py: 1,
              cursor: "pointer",
            }}
            onClick={leftSlideChangeHandler}
          >
            <ArrowBackIosIcon sx={{ ml: 1 }} />
          </Stack>
          {ImagesUrls.map((img, id) => {
            return activeImage === id ? (
              <Stack
                key={img.id}
                sx={{
                  width: "100%",
                  p: 0.5,
                  transition: "transform 0.3s ease-in-out",
                  height: "auto",
                }}
                className={activeImage === id && "active"}
              >
                <img
                  src={img.url}
                  key={img.id}
                  style={{
                    height: "30vh",
                    width: "100%",
                  }}
                />
              </Stack>
            ) : (
              <></>
            );
          })}
          <Stack
            sx={{
              bgcolor: "white",
              borderRadius: "5px",
              py: 1,
              position: "absolute",
              top: { xs: "40%", md: 90 },
              right: { xs: 10, md: 50 },
              transform: "rotate(180deg)",
              cursor: "pointer",
            }}
            onClick={rightSlideChangeHandler}
          >
            <ArrowBackIosIcon sx={{ ml: 1 }} />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              top: { xs: "86%", md: "86%" },
              right: { xs: "33%", sm: "43%"},
            }}
          >
            {ImagesUrls.map((slidebtn, indexbtn) => {
              return (
                <Stack key={indexbtn}>
                  <CircleIcon
                    key={indexbtn}
                    sx={{
                      width: {xs:"10px",md:"18px"},
                      color: activeImage === indexbtn ? "red" : "white",
                      mr: "5px",
                    }}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Carousel;
