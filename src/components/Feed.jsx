import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import UserList from "./UserList";
import { DataGrid } from '@mui/x-data-grid';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paperbase from "./paperbase/Paperbase";
 

 
const Feed = () => {
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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
   
    <Box flex={8}>
      {/* Top Bar */}
     
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #aaaa",
          padding: "8px 16px",
          textAlign: "left",
          margin: 0, // Remove any external margin
        }}
      >
        <Typography
          variant="h6"
          sx={{
            margin: 0, // Remove Typography margin
          }}
        >
          Menu Heading
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "8px 16px",
          textAlign: "left",
          margin: 0, // Remove any external margin
        }}
      >
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid xs={6}>
            <TextField
              required
              id="firstName"
              label="First Name"
              placeholder="Enter First Name"
              size="small"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              required
              id="txtLastName"
              label="Last Name"
              placeholder="Enter Last Name"
              size="small"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <FormControl sx={{ m: 0, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-label">Manager</InputLabel>
            <Select
              labelId="demo-select-label"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SaveAsIcon />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>

          <UserList />
        </Grid>
      </Box>
    </Box>
  );
};

export default Feed;
