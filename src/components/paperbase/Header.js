//import * as React from 'react';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Tooltip from "@mui/material/Tooltip";
import { Mail, Notifications } from "@mui/icons-material";
import React, { useState } from "react";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

const lightColor = "rgba(255, 255, 255, 0.7)";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

// const UserBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   gap: "10px",
//   alignItems: "center",
//   [theme.breakpoints.up("sm")]: {
//     display: "none",
//   },
// }));

const Header = (props) => {
  const { onDrawerToggle } = props;
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null); // For managing the menu's anchor element
  const opens = Boolean(anchorEl); // Determines if the menu is open

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked button as the anchor
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu by resetting the anchor
  };

  return (
    <React.Fragment>
      <AppBar color="info" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            {/* <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link>
            </Grid> */}
            <Grid item>
              <Tooltip title="Messages">
                <IconButton color="inherit">
                  <Badge badgeContent={2} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <Badge badgeContent={2} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>

            {/* <UserBox onClick={(e) => setOpen(true)}>
        <Avatar sx={{width:30, height:30}} {...stringAvatar('Yawar Umar')} />
        <Typography variant="span">Yawar</Typography>
        </UserBox> */}
            <Grid item>
              <Tooltip title="Profile">
                <IconButton
                   onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    {...stringAvatar("Yawar Umar")}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid item xs>
              <Typography color="inherit" variant="h6" component="h1">
                Starter Page
              </Typography>
            </Grid>
            {/* <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid> */}
            {/* <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
          </Grid>
        </Toolbar>
        <Menu
        id="profile-menu"
        anchorEl={anchorEl} // Attach the menu to the anchor element
        open={opens}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
      </AppBar>
      {/* <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" />
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
