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
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [switchPage, setSwitchPage] = useState(false);

  const useStyles = makeStyles({
    card: {
      background: '#323232',
      color: '#fff',
      minWidth: '300px',
      marginBottom: '5px'
    },
    button: {
      color: '#fff'
    },
    root: {
      '& label.Mui-focused': {
        color: '#000000'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#000000'
      },
      '& .MuiInputBase-input': {
        color: '#b0b0b0'
      }
    }
  });
  const classes = useStyles();

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
    <div style={{ height: '75vh' }}>
      <div style={{ paddingTop: '33vh' }}>
        <Grid container justify='center' alignContent='center'>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                className={classes.root}
                fullWidth
                placeholder='Email'
                type='email'
                onChange={handleEmail}
              />
              <TextField
                className={classes.root}
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
                }}
                fullWidth
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
              />
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                onClick={() => attemptAuth('signin')}
                variant='outlined'
              >
                Login
              </Button>
              <Button
                className={classes.button}
                onClick={() => attemptAuth('signup')}
                variant='outlined'
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </div>
  );
};
