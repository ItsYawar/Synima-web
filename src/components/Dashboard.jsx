import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
 
import { Divider, Typography } from "@mui/material";
import Paperbase from "./paperbase/Paperbase";


const Dashboard = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <Paperbase />
    </Box>
  );
};

export default Dashboard;
