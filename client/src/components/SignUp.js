// https://github.com/mui/material-ui/blob/v5.10.14/docs/data/material/getting-started/templates/sign-up/SignUp.js

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import slogo from './slogo.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ChatLator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const INITIAL_SETUP_LANGUAGE = "Please  Select  First  languange";
const theme = createTheme({
  palette: {
    background: {
      default: '#002B45',
      
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userLanguange, setUserLanguage] = useState(INITIAL_SETUP_LANGUAGE);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  
  const handleSignUp = () => {
    console.log("SignUp.js: button clicked");
    console.log("args are: ", fname, lname, userLanguange, email, password);
    if (!fname) {
      alert("first fname!");
      return;
    }
    if (!lname) {
      alert("first lname!");
      return;
    }
    if (!password) {
      alert("password!");
      return;
    }
    if (!email) {
      alert("email!");
      return;
    }
    if (userLanguange === INITIAL_SETUP_LANGUAGE) {
      alert("select user language!");
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": fname + " " + lname,
        "password": password,
        "primaryLanguage": userLanguange,
        "email": email
      })
    };

    fetch("users/signup", requestOptions)
      .then(response => response.json())
      .then(data => { console.log("Signup.js data is ", data); return data; })
      .then((data) => {
      
        console.log(data);
        // navigate chat -> 
        
          
        
        // move to Chat.js if successful
        if (data["success"]){ // if it's true, successful, 
          //then parse the data.
          navigate('../chatting', { state: 
                                {name : data["user"].name, // data["name"], 
                                email : data["user"].email, // data["email"],
                                primaryLanguage : data["user"].primaryLanguage , 
                                userGuid : data["user"].guid,         
                                } 
                                }); // I think this is all I need.  
        }
        if(!data["success"]){
          alert("There's a problem with your Sign up Information. \n Please Try Again.");
        }
        

      });

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  function setLanguage(lang) {
    setAnchorEl(null);
    setUserLanguage(lang);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 233, md: 167 },
        }}
        alt="The house from the offer."
        src={slogo}
      />
          <Typography component="h1" variant="h5" sx={{ color: "#FFFFFF", marginTop:4 }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFname(event.target.value)}
                  sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'}}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLname(event.target.value)}
                  sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'} }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'} }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'} }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{color:'white'}}
                >
                  {userLanguange}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => setLanguage("English")}>English</MenuItem>
                  <MenuItem onClick={() => setLanguage("French")}>French</MenuItem>
                  <MenuItem onClick={() => setLanguage("Spanish")}>Spanish</MenuItem>
                  <MenuItem onClick={() => setLanguage("German")}>German</MenuItem>
                  <MenuItem onClick={() => setLanguage("Chinese")}>Chinese</MenuItem>
                  <MenuItem onClick={() => setLanguage("Arabic")}>Arabic</MenuItem>
                  <MenuItem onClick={() => setLanguage("Hindi")}>Hindi</MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, color:'grey' }} />
      </Container>
    </ThemeProvider>
  );
}
