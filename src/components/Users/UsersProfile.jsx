import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
} from "@mui/material";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Rightbar from "../Rightbar";

const UsersProfile = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        {/* <Sidebar /> */}
       
        <form noValidate autoComplete="off">
          {/* Heading */}
          <Box sx={{ marginTop: 0, width: "100%" }}>
            <Paper></Paper>
          </Box>
          <Box sx={{ marginTop: 0 }}>
            {" "}
            {/* Add space from the top navbar */}
            <Typography variant="h6" align="left" gutterBottom>
              User Profile
            </Typography>
            <Grid container spacing={3}>
              {/* Left Card */}
              <Grid item xs={12} md={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Box>
                    <div
                      role="presentation"
                      tabIndex={0}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px dashed #ccc",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{
                          display: "none",
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        Upload photo
                      </Typography>
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      Allowed: *.jpeg, *.jpg, *.png, *.gif <br /> Max size: 3MB
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label={
                        <Box>
                          <Typography variant="subtitle2">
                            Email Verified
                          </Typography>
                          <Typography variant="body2">
                            Disabling this will automatically send the user a
                            verification email.
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Right Card */}
              <Grid item xs={12} md={9}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                   
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fisrt Name"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                       placeholder="Enter Fisrt Name"
                        sx={{
                          "& .MuiInputLabel-root": {
                            marginBottom: "8px", // Adjust the label position
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        placeholder="Enter phone number"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        placeholder="Choose a country"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="State/Region"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </form>

        {/* <Rightbar /> */}
      </Stack>
    </Box>
  );
};

export default UsersProfile;
