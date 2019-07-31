import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  InputBase,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [switchPage, setSwitchPage] = useState(false);

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const attemptAuth = async method => {
    try {
      const auth = await firebase.auth();

      if (method === 'signin') {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ paddingTop: '33vh' }}>
        <Grid container justify='center' alignContent='center'>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                placeholder='Email'
                type='email'
                onChange={handleEmail}
              />
              <TextField
                onChange={handlePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={ShowPassword}
                      >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                  // classes: {
                  //   root: classes.cssOutlinedInput,
                  //   focused: classes.cssFocused,
                  //   notchedOutline: classes.notchedOutline
                  // }
                }}
                fullWidth
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => attemptAuth('signin')} variant='outlined'>
                Login
              </Button>
              <Button onClick={() => attemptAuth('signup')} variant='outlined'>
                Sign Up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </div>
  );
};
