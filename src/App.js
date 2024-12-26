import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import AppTheme from '../src/shared-theme/AppTheme';
import ColorModeSelect from '../src/shared-theme/ColorModeSelect';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Signin"; // Your SignIn component
import Navbar from "./components/Navbar"
import Dashboard from './components/Dashboard';
import UserProfile from './components/Users/UsersProfile';
import { UserProvider } from './components/Hooks/UserContext';
import UsersProfile from './components/Users/UsersProfile';
import Feed from './components/Feed';
import Starter from './components/paperbase/Starter';
import CustomerList from './components/Customers/CustomerList';
import CreateProfile from './components/Customers/CreateProfile';
import DynamicForm from './components/Customers/DynamicForm';
 
 

 
function App(props) {
  
  return (
 <UserProvider>
    <Router basename="/Synima-web">
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="/Users/UsersProfile" element={<UsersProfile />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/Starter" element={<Starter />} />
      <Route path="/CustomerList" element={<CustomerList />} />
      <Route path="/CreateProfile" element={<CreateProfile />} />
      <Route path="/DynamicForm" element={<DynamicForm />} />
      {/* <Route path="/Sidebar" element={<Sidebar />} />
      <Route path="/Navbar" element={<Navbar />} /> */}
    </Routes>
  </Router>
  </UserProvider>
    // <Box>
    //  <Navbar />
    //   <Stack direction="row" spacing={2} justifyContent="space-evenly">
    //     <Sidebar />
    //     <Feed />
    //     <Rightbar />
    //   </Stack>
    // </Box>
   
  );
}

export default App;
