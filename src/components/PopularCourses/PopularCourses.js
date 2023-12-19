import React from "react";
import { Chip, Typography, Box, Grid, Stack } from "@mui/material";

const CourseList = [
  {
    id: 1,
    courseImage:
      "https://cloud.z.com/vn/wp-content/uploads/2023/05/ReactJS-online-training-nareshit.jpg",
    courseTittle: "React Js",
    courseRating: "5.0",
    courseAmount: "10000 Rs/-",
    exploreRoute: "#123",
  },
  {
    id: 2,
    courseImage:
      "https://cloud.z.com/vn/wp-content/uploads/2023/05/ReactJS-online-training-nareshit.jpg",
    courseTittle: "Node Js",
    courseRating: "5.0",
    courseAmount: "10000 Rs/-",
    exploreRoute: "#123",
  },
  {
    id: 3,
    courseImage:
      "https://cloud.z.com/vn/wp-content/uploads/2023/05/ReactJS-online-training-nareshit.jpg",
    courseTittle: "DSA",
    courseRating: "5.0",
    courseAmount: "10000 Rs/-",
    exploreRoute: "#123",
  },
  {
    id: 4,
    courseImage:
      "https://cloud.z.com/vn/wp-content/uploads/2023/05/ReactJS-online-training-nareshit.jpg",
    courseTittle: "MongoDB",
    courseRating: "5.0",
    courseAmount: "10000 Rs/-",
    exploreRoute: "#123",
  },
 
];

const PopularCourses = () => {
  return (
    <>
      <Box sx={{ px: 5, py: 0.5 }}>
        <Grid
          container
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            bgcolor: "white",
            borderRadius: "3px",
            boxShadow: "0px 5px 12px 0px",
          }}
        >
          <Grid items sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{fontSize:"25px"}}>Popular Courses</Typography>
            <Chip label="view all" sx={{cursor:"pointer"}}/>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            {CourseList.map((course, index) => {
              return (
                <Grid
                  items
                  sx={{
                    bgcolor: "white",
                    borderRadius: "3px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"space-between",
                    "&:hover":{
                        boxShadow: "0px 2px 5px 0px",
                    },
                    cursor:"pointer",
                    mt:{
                        xs:"15px"
                    }
                  }}
                  xs={12}
                  sm={5.75}
                  md={2.75}
                >
                  <Stack>
                    <img src={course.courseImage} style={{borderRadius:"5px"}}/>
                  </Stack>
                  <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",p:1.5}}>
                    <Typography sx={{fontSize:"18px"}}>{course.courseTittle}</Typography>
                    <Typography>5.0</Typography>
                  </Stack>
                  <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",p:1.5}}>
                    <Typography>20000 Rs/-</Typography>
                    <Chip label="Explore" />
                  </Stack>
                </Grid>
              );
            })}

            {/* <Grid
              items
              sx={{ bgcolor: "black", color: "white" }}
              xs={12}
              sm={5.75}
              md={2.75}
            >
              fvmfvm
            </Grid>
            <Grid
              items
              sx={{ bgcolor: "black", color: "white" }}
              xs={12}
              sm={5.75}
              md={2.75}
            >
              fvmfvm
            </Grid>
            <Grid items sx={{ bgcolor: "white" }} xs={12} sm={5.75} md={2.75}>
              fvmfvm
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PopularCourses;
