// https://github.com/mui/material-ui/blob/v5.10.14/docs/data/material/getting-started/templates/sign-in/SignIn.js

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
import logo from './logo.jpg'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";



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

const theme = createTheme({
  palette: {
    background: {
      default: '#002B45',
      
    },
  },
});

export default function SignIn() {
  const navigate = useNavigate(); // This is a hook.
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = () => {
    if (!email) {
      alert("email!");
      return;
    }
    if (!password) {
      alert("password!");
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    };

    fetch("users/login", requestOptions)
      .then(response => response.json())
      .then(data => { console.log("Signin.js data is ", data); return data; })
      .then((data) => {
        // move to Chat.js if successful
        // Getting all the stuff, reponse from server
        console.log(data);
        // navigate chat -> 
        

        
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
          alert("There's a problem with your Sign In Information. \n Please Try Again.");
        } 
       // return "nothing"; // not entirely sure what this is for.
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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline enableColorScheme/>
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
          </Avatar>
          <Avatar src="C:\Users\smqur\source\repos\seng-513-project\client\src\components\images\logo.jpg" /> */}
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="../images/logo.jpg"> */}
            {/* <LockOutlinedIcon /> */}
            {/* <img src="logo.jpg"></img> */}
          {/* </Avatar> */}
          <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 233, md: 167 },
        }}
        alt="The house from the offer."
        src={logo}
      />
          <Typography component="h1" variant="h5" sx={{ color: "#FFFFFF", marginTop:4 }} >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
              sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'} }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              sx={{ label: { color: 'grey' }, name: { color: 'grey'}, input:{color:'white'} }}
              
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // href="Chat" // no href rather sign in and handleSignIn will navigation to Chat
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSignIn()}
            >
              Sign In
            </Button>
            <Grid container sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="Chat" variant="body2">
                  {"Bypass signup to chat"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color:'grey'}} />
      </Container>
    </ThemeProvider>
  );
}
