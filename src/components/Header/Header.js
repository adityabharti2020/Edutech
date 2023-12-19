import React, { useState } from "react";
import {
  Grid,
  Stack,
  InputBase,
  Box,
  Chip,
  Typography,
  Popover,
} from "@mui/material";
import logo from "../../Assets/edutech400n.webp";
import TranslateIcon from "@mui/icons-material/Translate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DrawerComponent from "../Drawer/DrawerComponent";

const tutorials = [
  {
    id: 1,
    TutorialName: "HTML",
  },
  {
    id: 2,
    TutorialName: "CSS",
  },
  {
    id: 3,
    TutorialName: "JvaScript",
  },
  {
    id: 4,
    TutorialName: "ReactJs",
  },
  {
    id: 5,
    TutorialName: "NodeJs",
  },
  {
    id: 6,
    TutorialName: "PHP",
  },
  {
    id: 7,
    TutorialName: "PyThon",
  },
];

const Course = [
  {
    id: 1,
    course: "DSA To Devlopment",
  },
  {
    id: 2,
    course: "Data Science Training Program",
  },
  {
    id: 3,
    course: "Gate & DSA",
  },
  {
    id: 4,
    course: "FullStack On React Node & MongoDB",
  },
];

const Header = () => {
  const inputChangeHandler = (e) => {
    console.log(e.target.value);
  };
  const [tutorial, settutorial] = useState(null);
  const [course, setcourse] = useState(null);

  const handletutorial = (event) => {
    settutorial(event.currentTarget);
  };
  const handleCourse = (event) => {
    setcourse(event.currentTarget);
  };

  const handleTutorialClose = () => {
    settutorial(null);
  };
  const handleCoursesClose = () => {
    setcourse(null);
  };

  const openTutorial = Boolean(tutorial);
  const idtut = openTutorial ? "simple-popover" : undefined;
  const openCourse = Boolean(course);
  const idcourse = openCourse ? "simple-popover" : undefined;

  return (
    <Grid
      container
      sx={{
        bgcolor: "black",
        p: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Grid item xs={3.75}>
        <img
          src={logo}
          style={{ width: "100px", height: "40px", color: "white" }}
        />
      </Grid>
      <Grid item xs={3.75}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "0 10px",
            borderRadius: "10px",
            width: {
              xs: "100%",
              sm: "70%",
            },
            height: "33px",
          }}
        >
          <InputBase placeholder="Search..." onChange={inputChangeHandler} />
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            md: "flex",
          },
          flexDirection: "row",
          justifyContent: {
            xs: "end",
            sm: "end",
            md: "space-between",
          },
          cursor: "pointer",
          alignItems: "center",
          color: "white",
        }}
        xs={3.75}
      >
        <Stack
          aria-describedby={idtut}
          sx={{
            mr: 2,
            "&:hover": {
              color: "goldenrod",
            },
            display: "flex",
            flexDirection: "row",
          }}
          onClick={handletutorial}
        >
          Tutorials
          <Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform:
                  tutorial === null ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </Typography>
        </Stack>
        <Stack
          aria-describedby={idcourse}
          sx={{
            mr: 2,
            "&:hover": {
              color: "goldenrod",
            },
            display: "flex",
            flexDirection: "row",
          }}
          onClick={handleCourse}
        >
          Course
          <Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: course === null ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </Typography>
        </Stack>
        <Stack
          sx={{
            mr: 2,
            "&:hover": {
              color: "goldenrod",
            },
          }}
        >
          {<TranslateIcon sx={{ width: "16px", height: "16px" }} />}
        </Stack>
        <Chip label="LogIn" sx={{ mr: 1, bgcolor: "white", color: "black" }} />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: {
            xs: "block",
            sm: "none",
            md: "none",
          },
        }}
      >
        <DrawerComponent />
      </Grid>
      <Popover
        id={idtut}
        open={openTutorial}
        anchorEl={tutorial}
        onClose={handleTutorialClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          sx={{ display: "flex", flexDirection: "column", width: "150px" }}
        >
          {tutorials.map((TutName, index) => {
            return (
              <Typography
                key={TutName.id}
                sx={{
                  p: 1,
                  "&:hover": {
                    bgcolor: "gray",
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                {TutName.TutorialName}
              </Typography>
            );
          })}
        </Stack>
      </Popover>
      <Popover
        id={idcourse}
        open={openCourse}
        anchorEl={course}
        onClose={handleCoursesClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          sx={{ display: "flex", flexDirection: "column", width: "150px" }}
        >
          {Course.map((courseName, index) => {
            return (
              <Typography
                key={index}
                sx={{
                  p: 1,
                  "&:hover": {
                    bgcolor: "gray",
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                {courseName.course}
              </Typography>
            );
          })}
        </Stack>
      </Popover>
    </Grid>
  );
};

export default Header;
