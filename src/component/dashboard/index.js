import React, { useEffect, useState } from 'react';
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
import firebase from 'firebase';
import db from '../../credentials/firebaseConfig';
import { graphDataFormat } from '../api/graphDataFormat';

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

  const [progression, setProgression] = useState({});

  const data = mockData;

  const classes = useStyles();

  const user = firebase.auth().currentUser;

  const test = data => {
    const payload = graphDataFormat(data);
  };

  useEffect(() => {
    const docRef = db.collection('users').doc(user.uid);
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        setProgression(doc.data());
        console.log(doc.data());
        test(doc.data());
      } else {
        console.log('did not find');
      }
    });
  }, []);

  return (
    <Grid container alignContent='center' justify='center'>
      {progression.progress
        ? progression.progress.exercise.map((item, index) => {
            return (
              <ExpansionPanel key={index} className={classes.card}>
                <ExpansionPanelSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls='Expand graph for data'
                >
                  {`${item.name} Progression`}
                </ExpansionPanelSummary>
              </ExpansionPanel>
            );
          })
        : null}
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
