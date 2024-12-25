import React, { useState, useEffect } from "react";
import {
  Grid,
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
import { Box, ThemeProvider } from "@mui/system";
import Copyright from "../Copyright";
import Navigator from "../paperbase/Navigator";
import Header from "../paperbase/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import themeOverrides from '../theme'; // Import the theme


const drawerWidth = 256;
const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  // Fetch fields from database
  useEffect(() => {
    // Simulate an API call
    const fetchFields = async () => {
      const response = await Promise.resolve([
        { key: "customerName", label: "Customer Name", type: "text" },
        { key: "supplyChain", label: "Supply Chain", type: "text" },
        {
          key: "country",
          label: "Country",
          type: "select",
          options: ["USA", "Canada", "UK"],
        },
        { key: "emailVerified", label: "Email Verified", type: "checkbox" },
      ]);
      setFields(response);

      // Initialize formData with keys
      const initialData = response.reduce((acc, field) => {
        acc[field.key] = field.type === "checkbox" ? false : "";
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, []);

  // Handle field change
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Submit form
  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(themeOverrides.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <ThemeProvider theme={themeOverrides}>
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        {/* This is the Content Area */}
        <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" marginBottom={3} sx={{ textAlign: "center" }}>
        Customer Profile
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field.key}>
            {field.type === "text" && (
              <TextField
                label={field.label}
                fullWidth
                variant="outlined"
                size="small"
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={formData[field.key] || ""} // Default to empty string if no value
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  label={field.label} // This links the label to the Select
                >
                  {field.options.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {field.type === "checkbox" && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                  />
                }
                label={field.label}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{ marginTop: 2, float: "right" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Paper>
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  </ThemeProvider>


   
  );
};

export default DynamicForm;
