import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import LineChart from '../graph/LineChart';
import { makeStyles } from '@material-ui/core/styles';

export const Dashboard = props => {
  const useStyles = makeStyles({
    card: {
      backgroundImage: 'linear-gradient(to right, #4568dc , #b06ab3);'
    }
  });
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Grid container direction='column'>
        <Grid item>
          <Typography variant='subtitle1'>Squat Weight</Typography>
        </Grid>
        <Grid item>
          <LineChart />
        </Grid>
      </Grid>
    </Paper>
  );
};
