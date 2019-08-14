import React, { useState } from 'react';
import firebase from 'firebase';
import {
  Button,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid
} from '@material-ui/core';
import { askForPermissioToReceiveNotifications } from '../../notification/requestPermission';

export const Settings = props => {
  const [permission, setPermission] = useState(false);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handlePermission = async () => {
    await askForPermissioToReceiveNotifications();
    setPermission(!permission);
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Settings</h1>
      <Grid container direction='row'>
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      <Grid container direction='row'>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              style={{ color: 'white' }}
              control={
                <Switch
                  checked={permission}
                  onChange={handlePermission}
                  color='secondary'
                />
              }
              label='Notification'
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </div>
  );
};
