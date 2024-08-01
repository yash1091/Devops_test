import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import * as actions from '../store/authActions';
import { useNavigate  , useLocation } from "react-router-dom";

import { makeStyles } from '@mui/styles';

// Define a custom spacing function
const customSpacing = (value) => `${value * 8}px`;

const useStyles = makeStyles({
  paper: {
    marginTop: customSpacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: customSpacing(1),
    backgroundColor: '#ff1744', // Example color, replace with actual theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: customSpacing(1),
  },
  submit: {
    margin: customSpacing(3) + ' 0 ' + customSpacing(2),
  },
});

function Login(props) {
  const classes = useStyles();
  const [username, setuserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  React.useEffect(() => {
    if (props.isAuthenticated) { navigate(from,{ replace: true }) };
  });


  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case 'username': setuserName(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      default: return null;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAuth(username, password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleFormFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormFieldChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(null, mapDispatchToProps)(Login);