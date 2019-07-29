import React, { useState } from 'react';
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
import { withRouter } from 'react-router';

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
  },
  smallAvatar: {
    margin: 10,
    width: 32,
    height: 32,
    float: 'right'
  }
});

const Navigation = props => {
  const classes = useStyles();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleToggleDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  console.log(props);

  const handleRoutes = async route => {
    await props.history.push(route);
    handleToggleDrawer();
  };

  return (
    <div>
      {props.location.pathname === '/' ? (
        <div>
          <AppBar className={classes.card}>
            <Toolbar>
              <Grid container>
                <Grid>
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
        </div>
      ) : (
        <div>
          <AppBar className={classes.card}>
            <Toolbar>
              <Grid>
                <IconButton
                  style={{ marginRight: '60vw' }}
                  onClick={handleToggleDrawer}
                >
                  <MdMenu />
                </IconButton>
                <IconButton>
                  <Avatar
                    src='https://michael-schacht.com/wp-content/uploads/2018/02/parkerheadshot.jpg'
                    className={classes.smallAvatar}
                  >
                    UN
                  </Avatar>
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      )}

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
            <ListItem button onClick={() => handleRoutes('/')}>
              <ListItemIcon>
                <MdDashboard className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleRoutes('/progress')}>
              <ListItemIcon>
                <MdTimeline className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Progress</ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleRoutes('/explore')}>
              <ListItemIcon>
                <MdExplore className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Explore</ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleRoutes('/friends')}>
              <ListItemIcon>
                <MdPeople className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Friends</ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleRoutes('/settings')}>
              <ListItemIcon>
                <MdSettings className={classes.whiteIcon} />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </div>
      <div style={{ paddingTop: '250px' }}>{props.children}</div>
    </div>
  );
};

export default withRouter(Navigation);
