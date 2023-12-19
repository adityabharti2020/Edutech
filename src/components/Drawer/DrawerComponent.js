import React, { useState } from "react";
import {
  Grid,
  Stack,
  InputBase,
  Box,
  Chip,
  Typography,
  Popover,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import './style.css'
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DrawerComponent = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 200,
        mt: 1,
      }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{ display: "flex", p: 1, mt: 1 }}
        onClick={toggleDrawer(anchor, false)}
      >
        {
          <CancelIcon
            sx={{ marginLeft: "auto", width: "35px", height: "35px" }}
          />
        }
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Chip
          label="Sign In"
          sx={{ bgcolor: "black", color: "white", cursor: "pointer" }}
        />
      </Box>
      <Box className="custom-scrollbar">
        <List>
          {[
            "All Course",
            "DSA to Devlopment",
            "For Working Professionals",
            "For Student",
            "Tutorials",
            "Data Structure & Algorithms",
            "Web Devlopment",
            "GATE",
            "CS Subject",
            "Practice",
            "Commerce",
            "Web Devlopment in PyThon",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  borderBottom: "0.5px solid black",
                  "&:hover": {
                    bgcolor: "gray",
                    color: "white",
                  },
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={text}
                />
                {
                  <KeyboardArrowDownIcon
                    sx={{
                      display:
                        index == 0 || index == 4 || index == 9
                          ? "none"
                          : "block",
                    }}
                  />
                }
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <>
      <Box>
        {["right"].map((anchor) => {
          return (
            <>
              <Button onClick={toggleDrawer(anchor, true)}>
                {<MenuIcon />}
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default DrawerComponent;
