import React, { useState, useEffect, useMemo } from "react";
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
import themeOverrides from "../theme"; // Import the theme
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import Copyright from "../Copyright";
import { Country, State, City } from "country-state-city";

const drawerWidth = 256;

const Contacts = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up("sm"));
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
    // Fetch fields from API
    const fetchFields = async () => {
      try {
        const response = await axios.get(
          "https://samyar90-001-site1.jtempurl.com/api/FormElements/1"
        );
        const data = response.data;

        // Parse options for select fields
        const parsedFields = data.map((field) => {
          if (field.fieldType === "select" && field.options) {
            return { ...field, options: JSON.parse(field.options) };
          }
          return field;
        });

        setFields(parsedFields);

        // Initialize formData with default values
        const initialData = parsedFields.reduce((acc, field) => {
          acc[field.fieldName] =
            field.fieldType === "checkbox" ? false : field.defaultValue || "";
          return acc;
        }, {});
        setFormData(initialData);
      } catch (error) {
        console.error("Error fetching form fields:", error);
      }
    };

    fetchFields();
  }, []);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .normalize("NFD") // Normalize special characters like accents
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^a-zA-Z0-9\s-]/g, ""); // Remove any other special characters
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("customerId", 0);
    payload.append("customerName", formData.customerName || "");
    payload.append("tenantID", 1);
    payload.append("customerLogo", "test.png"); // Raw file instead of Base64
    payload.append("country", selectedCountry?.name || "");
    payload.append("city", selectedCity?.name || "");
    payload.append("stateName", selectedState?.name || "");
    //payload.append("customerTypeId", 0);
    payload.append("address", formData.address || "");
    payload.append("phone", formData.phone || "");
    payload.append("mobileNo", formData.mobileNo || "");
    payload.append("email", formData.email || "");
    // payload.append("IsActive", formData.isActive || true);
  
    try {
      const response = await axios.post(
        "https://samyar90-001-site1.jtempurl.com/api/Customer/CreateCustomer",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  }
  return (
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Single column on mobile, two columns on small+ screens
              gap: 2, // Spacing between items
            }}
          >
            {fields.map((field) => (
              <Box key={field.fieldName}>
                {field.fieldType === "text" && (
                  <TextField
                    label={field.label}
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData[field.fieldName]}
                    onChange={(e) =>
                      handleChange(field.fieldName, e.target.value)
                    }
                    placeholder={field.placeholder}
                  />
                )}
                {field.fieldType === "select" && (
                  <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                  >
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={
                        field.fieldName === "country"
                          ? selectedCountry?.isoCode || ""
                          : field.fieldName === "state"
                          ? selectedState?.isoCode || ""
                          : field.fieldName === "city"
                          ? selectedCity?.name || ""
                          : formData[field.fieldName] || ""
                      }
                      onChange={(e) => {
                        handleChange(field.fieldName, e.target.value);

                        // Handle cascading dropdown updates
                        if (field.fieldName === "country") {
                          handleCountryChange(e.target.value);
                        } else if (field.fieldName === "state") {
                          handleStateChange(e.target.value);
                        } else if (field.fieldName === "city") {
                          handleCityChange(e.target.value);
                        }
                      }}
                      label={field.label}
                    >
                      <MenuItem value="" disabled>
                        {`Select ${field.label}`}
                      </MenuItem>
                      {(field.fieldName === "country"
                        ? countries
                        : field.fieldName === "state"
                        ? states
                        : field.fieldName === "city"
                        ? cities
                        : field.options || []
                      ).map((option) => (
                        <MenuItem
                          key={
                            option.isoCode ||
                            option.name ||
                            option.value
                          }
                          value={
                            option.isoCode ||
                            option.name ||
                            option.value
                          }
                        >
                          {formatName(option.name || option.label)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            ))}
          </Box>

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
    // <ThemeProvider theme={themeOverrides}>
    //   <Box sx={{ display: "flex", minHeight: "100vh" }}>
    //     <CssBaseline />
    //     <Box
    //       component="nav"
    //       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //     >
    //       {isSmUp ? null : (
    //         <Navigator
    //           PaperProps={{ style: { width: drawerWidth } }}
    //           variant="temporary"
    //           open={mobileOpen}
    //           onClose={handleDrawerToggle}
    //         />
    //       )}
    //       <Navigator
    //         PaperProps={{ style: { width: drawerWidth } }}
    //         sx={{ display: { sm: "block", xs: "none" } }}
    //       />
    //     </Box>

    //     <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    //       <Header onDrawerToggle={handleDrawerToggle} />

    //       <Box
    //         component="main"
    //         sx={{ flex: 2, py: 6, px: 4, bgcolor: "#eaeff1" }}
    //       >
          
    //       </Box>
    //       <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
    //         <Copyright />
    //       </Box>
    //     </Box>
    //   </Box>
    // </ThemeProvider>
  );
};

export default Contacts;
