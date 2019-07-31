import React from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

export const Settings = props => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Settings</h1>
      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
