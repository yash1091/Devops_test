import React from 'react';
import axios from 'axios';
import * as settings from '../settings';

import { makeStyles } from '@mui/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Custom color for primary
    },
    secondary: {
      main: '#19857b', // Custom color for secondary
    },
    error: {
      main: '#ff1744', // Custom color for error
    },
    success: {
      main: '#4caf50', // Custom color for success
    },
    // You can add more colors as needed
  },
});

// Define a custom spacing function
const customSpacing = (value) => `${value * 8}px`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: customSpacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: customSpacing(1),
    backgroundColor: 'success.main',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: customSpacing(1),
  },
  submit: {
    margin: customSpacing(3) + ' 0 ' + customSpacing(2),
  },
  success: {
    color: 'success.main',
  }
}));

function PasswordUpdate(props) {
  const classes = useStyles();
  const [new_password1, setNewPassword1] = React.useState(null);
  const [new_password2, setNewPassword2] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleFormFieldChange = (event) => {
    setSuccess(false);
    switch (event.target.id) {
      case 'new_password1': setNewPassword1(event.target.value); break;
      case 'new_password2': setNewPassword2(event.target.value); break;
      default: return null;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password1 !== new_password2) {
      alert("Passwords don't match")
    } else {
      let headers = { 'Authorization': `Token ${props.token}` };
      let method = 'post';
      let url = settings.API_SERVER + '/api/auth/update_password/';
      let passwordFormData = new FormData();
      passwordFormData.append("new_password1", new_password1);
      passwordFormData.append("new_password2", new_password2);
      let config = { headers, method, url, data: passwordFormData};
      //Axios update_password API call
      axios(config).then(res => {
        setSuccess(true);
      }).catch(
        error => {
          alert(error)
        })
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {success ? <Typography variant="button" className={classes.success} gutterBottom>Password update successful!</Typography> : null}
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password1"
            label="Enter New Password"
            type="password"
            id="new_password1"
            onChange={handleFormFieldChange}
            error={new_password1 !== new_password2}
            helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password2"
            label="Enter Your Password Again"
            type="password"
            id="new_password2"
            onChange={handleFormFieldChange}
            error={new_password1 !== new_password2}
            helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Password
          </Button>
        </form>
      </div>
    </Container>
  );
}


export default PasswordUpdate;