import React from 'react';
import {
  Grid,
  Paper,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel
} from '@material-ui/core';
import LineChart from '../graph/LineChart';
import { makeStyles } from '@material-ui/core/styles';
import { MdExpandMore } from 'react-icons/md';
import mockData from '../mockData/progess.json';

export const Dashboard = props => {
  const useStyles = makeStyles({
    graphcard: {
      backgroundImage: 'linear-gradient(to right, #ec6f66 , #f3a183);',
      color: '#212121',
      minWidth: '300px'
    },
    card: {
      background: '#323232',
      color: '#fff',
      minWidth: '300px',
      marginBottom: '5px'
    },
    whiteIcon: {
      color: 'white'
    }
  });

  const data = mockData;

  const classes = useStyles();
  return (
    <Grid container alignContent='center' justify='center'>
      {data.map((item, index) => {
        return (
          <ExpansionPanel key={index} className={classes.card}>
            <ExpansionPanelSummary
              expandIcon={<MdExpandMore />}
              aria-controls='Expand graph for data'
            >
              {`${item.series[0].name} Progression`}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Paper className={classes.graphcard}>
                <Grid container direction='column'>
                  <Grid item>
                    <LineChart data={item} />
                  </Grid>
                </Grid>
              </Paper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Grid>
  );
};
