import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "../paperbase/Navigator";

import Header from "../paperbase/Header";
import Copyright from "../Copyright";
import themeOverrides from "../theme"; // Import the theme
import AllCustomerContacts from "./AllCustomerContacts";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Contacts from "./Contacts"; // Import the Contacts component
const drawerWidth = 256;
const ContactsList = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up("sm"));
  // Handle dialog open/close
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  //   const handleDialogOpen = () => {
  //     setIsDialogOpen(true);
  //   };

  //   const handleDialogClose = () => {
  //     setIsDialogOpen(false);
  //   };
  return (
    <ThemeProvider theme={themeOverrides}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            {/* This is the Content Area */}
            {/* This is Contact List page */}
            <AppBar position="static" color="transparent" elevation={0}>
              <Toolbar>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      onClick={handleDialogOpen}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <AllCustomerContacts />

            {/* Dialog for opening Contacts.jsx */}
            <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="lg" // Adjust as needed
            >
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogContent>
                <Contacts /> {/* Render Contacts inside Dialog */}
              </DialogContent>
            </Dialog>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ContactsList;
