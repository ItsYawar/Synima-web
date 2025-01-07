import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  CssBaseline,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios"; // Import axios
import useMediaQuery from "@mui/material/useMediaQuery";
import themeOverrides from "../theme"; // Import your theme overrides
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import Copyright from "../Copyright";

import { ThemeProvider } from "@mui/material/styles";

const drawerWidth = 256;

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch fields from API
    const fetchFields = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5041/api/FormElements/1"
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

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography
                variant="h6"
                marginBottom={3}
                sx={{ textAlign: "left" }}
              >
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
                    {field.fieldType === "select" && field.options && (
                      <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          value={formData[field.fieldName] || ""}
                          onChange={(e) =>
                            handleChange(field.fieldName, e.target.value)
                          }
                          label={field.label}
                        >
                          {field.options.map((option) => (
                            <MenuItem value={option.value} key={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ float: "right" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DynamicForm;
