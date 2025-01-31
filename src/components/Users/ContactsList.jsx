import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import Copyright from "../Copyright";
import themeOverrides from "../theme";
import AllCustomerContacts from "./AllCustomerContacts";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Contacts from "./Contacts";

const drawerWidth = 256;

const ContactsList = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up("sm"));

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Prevent overflow on the main container
          }}
        >
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{
              flex: 1,
              py: 6,
              px: 4,
              bgcolor: "#eaeff1",
              overflow: "hidden", // Prevent overflow on the main content area
            }}
          >
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
            <Box
              sx={{
                width: "100%",
                overflow: "auto", // Enable scrolling inside the DataGrid container
              }}
            >
              <AllCustomerContacts />
            </Box>
            <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="lg"
            >
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogContent>
                <Contacts />
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