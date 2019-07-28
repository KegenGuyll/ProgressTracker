import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import {
  MdMenu,
  MdDashboard,
  MdExplore,
  MdPeople,
  MdTimeline,
  MdSettings
} from 'react-icons/md';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  card: {
    backgroundColor: '#323232',
    color: 'white',
    borderBottomLeftRadius: '19px',
    borderBottomRightRadius: '19px'
  },
  fullWidth: {
    width: '100%'
  },
  dark: {
    backgroundColor: '#0000007d',
    color: 'white'
  },
  whiteIcon: {
    color: 'white',
    height: '20px',
    width: '20px'
  }
});

export const Navigation = props => {
  const classes = useStyles();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleToggleDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <div>
      <AppBar className={classes.card}>
        <Toolbar>
          <Grid container>
            <Grid
              spacing={0}
              direction='row'
              alignItems='center'
              justify='center'
            >
              <Grid item>
                <IconButton onClick={handleToggleDrawer}>
                  <MdMenu />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              direction='column'
              alignItems='center'
              justify='center'
              style={{ minHeight: '20vh' }}
            >
              <Grid item xs={3}>
                <Avatar
                  src='https://michael-schacht.com/wp-content/uploads/2018/02/parkerheadshot.jpg'
                  className={classes.bigAvatar}
                >
                  UN
                </Avatar>
              </Grid>
              <Grid item xs={3}>
                <Typography>User Name</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          anchor='left'
          open={toggleDrawer}
          onOpen={handleToggleDrawer}
          onClose={handleToggleDrawer}
          className={classes.dark}
        >
          <List>
            <Typography style={{ padding: 20 }} variant='h6'>
              Progress Tracker
            </Typography>
            <ListItem button>
              <ListItemIcon>
                <MdDashboard className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdTimeline className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Progress</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdExplore className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Explore</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdPeople className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Friends</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdSettings className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </div>
      {props.childern}
    </div>
  );
};
