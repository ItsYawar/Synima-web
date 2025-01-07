import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { Link, useLocation } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Avatar, Typography } from '@mui/material';

const categories = [
  {
    id: 'Menu',
    children: [
      { id: 'Starter', icon: <PeopleIcon />, to: '/Starter' },
      { id: 'Create Profile', icon: <DnsRoundedIcon />, to: '/CreateProfile' },
      { id: 'List of Users', icon: <PermMediaOutlinedIcon />, to: '/CustomerList' },
      { id: 'Dynamic', icon: <PublicIcon />, to: '/DynamicForm' },
      { id: 'Create Customer', icon: <SettingsEthernetIcon />, to: '/CreateCustomer' },
      { id: 'Machine learning', icon: <SettingsInputComponentIcon />, to: '/MachineLearning' },
    ],
  },
  {
    id: 'Reports',
    children: [
      { id: 'Analytics', icon: <SettingsIcon />, to: '/Analytics' },
      { id: 'Performance', icon: <TimerIcon />, to: '/Performance' },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon />, to: '/TestLab' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const Navigator = (props) => {
  const { ...other } = props;
  const location = useLocation(); // Hook to get the current route path

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Synima
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
              <ListItem
                disablePadding
                key={childId}
                component={to ? Link : 'div'}
                to={to || undefined}
              >
                <ListItemButton
                  selected={location.pathname === to} // Highlight based on current path
                  sx={{
                    ...item,
                    ...(location.pathname === to && {
                      bgcolor: 'rgba(255, 255, 255, 0.08)', // Highlight style
                      color: '#fff',
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === to ? '#fff' : 'inherit',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
       
    </Drawer>
  );
};

export default Navigator;
