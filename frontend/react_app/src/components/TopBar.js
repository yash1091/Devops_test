import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';  

// Define a custom spacing function
const customSpacing = (value) => `${value * 8}px`;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: customSpacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Iris Species Predictor
          </Typography>
          <IconButton aria-label="home page" color="inherit" href="/">
            <HomeIcon />
          </IconButton>
          {props.isAuthenticated ? <Button color="inherit" href="/update_password">Update Password</Button> : null}
          {props.isAuthenticated ? <Button color="inherit" onClick={() => props.logout()}>Logout</Button> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}