import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import themeOverrides from "../theme"; // Import the theme
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import Copyright from "../Copyright";

const drawerWidth = 256;
const CreateProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [age, setAge] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    const payload = {
      StudentId: 3,
      StudentName: firstName,
      IsActive: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/StudentAPI",
        payload
      );
      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error, payload);
      alert("Failed to save data.");
    }
  };

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
            sx={{ flex: 2, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                {/* Left Column: Upload Photo */}
                <Grid item xs={12} sm={4} md={3}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6" mb={2} sx={{ textAlign: 'center' }}>
                      {" "}
                      Company Logo
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="photo-upload"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="photo-upload">
                        <Avatar
                          sx={{
                            width: 120,
                            height: 120,
                            cursor: "pointer",
                            border: "2px solid #ccc",
                            marginBottom: 1,
                          }}
                          src={image || ""}
                        >
                          {!image && (
                            <Typography variant="h6" color="textSecondary">
                              +
                            </Typography>
                          )}
                        </Avatar>
                      </label>
                      <Typography variant="caption" color="textSecondary">
                        Upload photo
                      </Typography>
                    </Box>
                    <Box mt={3}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label={
                          <Box>
                            <Typography variant="subtitle2">
                              Email Verified
                            </Typography>
                            <Typography variant="body2">
                              User Activate
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    <Box mt={3}>
                      <Typography variant="h6" mb={2}>
                        {" "}
                        Upload Visiting Card
                      </Typography>
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
                          Upload Visiting Card
                        </Typography>
                      </div>
                      <Typography variant="caption" color="textSecondary">
                        Allowed: *.jpeg, *.jpg, *.png, *.gif <br /> Max size:
                        3MB
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Right Column: Input Forms */}
                <Grid item xs={12} sm={8} md={9}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" marginBottom={3}>
                      Customer Profile
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Customer Name"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Supply Chain"
                          fullWidth
                          variant="outlined"
                          margin="none"
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
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Country"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
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
                          label="Land Line #"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          placeholder="Enter LandLine Number"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Address"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Zip Code"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          placeholder="Zip Code"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Website"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Product Category"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Representative Name"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Mobile"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="WhatsApp"
                          fullWidth
                          variant="outlined"
                          margin="none"
                          size="small"
                        />
                      </Grid>
                    </Grid>

                    {/* Separator */}
                    <Box mt={2} mb={2}>
                      <Divider />
                    </Box>

                    {/* Liaison Details Section */}
                    <Typography variant="h6" gutterBottom>
                      Liaison Details
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid> <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid> <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        margin="none"
                        size="small"
                      />
                    </Grid>
                    </Grid>

                  {/* Button aligned to the right */}
<Grid item xs={12}>
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Button variant="contained" onClick={handleSubmit}>
      Save
    </Button>
  </Box>
</Grid>

                  </Paper>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateProfile;
