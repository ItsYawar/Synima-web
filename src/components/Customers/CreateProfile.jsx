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
  FormControl,
  Switch,
  Avatar,
  Divider,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import themeOverrides from "../theme"; // Import the theme
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import Copyright from "../Copyright";
import { Country, State, City } from "country-state-city";
import { FixedSizeList } from "react-window"; // For virtualization

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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  useEffect(() => {
    const fetchCountries = () => {
      const allCountries = Country.getAllCountries();

      // Filter out countries without valid states and cities
      const filteredCountries = allCountries.filter((country) => {
        const countryStates = State.getStatesOfCountry(country.isoCode);
        if (!countryStates || countryStates.length === 0) return false;

        // Check if at least one state has cities
        return countryStates.some((state) => {
          const stateCities = City.getCitiesOfState(
            country.isoCode,
            state.isoCode
          );
          return stateCities && stateCities.length > 0;
        });
      });

      setCountries(filteredCountries);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (countryIsoCode) => {
    const selectedCountry = countries.find(
      (country) => country.isoCode === countryIsoCode
    );
    setSelectedCountry(selectedCountry);

    const availableStates = State.getStatesOfCountry(countryIsoCode).filter(
      (state) => {
        const stateCities = City.getCitiesOfState(
          countryIsoCode,
          state.isoCode
        );
        return stateCities && stateCities.length > 0;
      }
    );

    setStates(availableStates);
    setCities([]);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (stateIsoCode) => {
    const selectedState = states.find(
      (state) => state.isoCode === stateIsoCode
    );
    setSelectedState(selectedState);

    const availableCities = City.getCitiesOfState(
      selectedCountry.isoCode,
      stateIsoCode
    );
    setCities(availableCities);
    setSelectedCity(null);
  };

  const handleCityChange = (cityName) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    setSelectedCity(selectedCity);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .normalize("NFD") // Normalize special characters like accents
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^a-zA-Z0-9\s-]/g, ""); // Remove any other special characters
  };

  

  const handleSubmit = async () => {
    // const payload = {
    //   StudentId: 3,
    //   StudentName: firstName,
    //   IsActive: true,
    // };

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/StudentAPI",
    //     payload
    //   );
    //   console.log("Data saved successfully:", response.data);
    //   alert("Data saved successfully!");
    // } catch (error) {
    //   console.error("Error saving data:", error, payload);
    //   alert("Failed to save data.");
    // }
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile, horizontally on larger screens
                  gap: 1,
                }}
              >
                {/* Left Column: Upload Photo */}
                <Box
                  sx={{
                    flex: { xs: "0 0 100%", sm: "0 0 33.33%", md: "0 0 25%" }, // Adjust the width according to the screen size
                    padding: 1,
                  }}
                >
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography
                      variant="h6"
                      mb={2}
                      sx={{ textAlign: "center" }}
                    >
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
                  </Paper>
                </Box>

                {/* Right Column: Input Forms */}
                <Box
                  sx={{
                    flex: { xs: "0 0 100%", sm: "0 0 66.67%", md: "0 0 75%" }, // Adjust the width accordingly
                    padding: 1,
                  }}
                >
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

                      {/* Country Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" variant="outlined">
                          <InputLabel>Country</InputLabel>
                          <Select
                            value={selectedCountry?.isoCode || ""}
                            onChange={(e) =>
                              handleCountryChange(e.target.value)
                            }
                            label="Country"
                          >
                            <MenuItem value="" disabled>
                              Select Country
                            </MenuItem>
                            {countries.map((country) => (
                              <MenuItem
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* State Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" variant="outlined">
                          <InputLabel>State</InputLabel>
                          <Select
                            disabled={!selectedCountry}
                            value={selectedState?.isoCode || ""}
                            onChange={(e) => handleStateChange(e.target.value)}
                            label="State"
                          >
                            <MenuItem value="" disabled>
                              Select State
                            </MenuItem>
                            {states.map((state) => (
                              <MenuItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {formatName(state.name)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* City Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" variant="outlined">
                          <InputLabel>City</InputLabel>
                          <Select
                            disabled={!selectedState}
                            value={selectedCity?.name || ""}
                            onChange={(e) => handleCityChange(e.target.value)}
                            label="City"
                          >
                            <MenuItem value="" disabled>
                              Select City
                            </MenuItem>
                            {cities.map((city) => (
                              <MenuItem key={city.name} value={city.name}>
                                {formatName(city.name)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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

                    {/* Button aligned to the right */}
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={handleSubmit}>
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
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
