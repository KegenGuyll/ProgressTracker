import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import db from '../../credentials/firebaseConfig';
import {
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { MdAdd, MdRemove, MdDelete, MdClose } from 'react-icons/md';
import { progressStyle } from './style';
import CreateExercise from './createExercise';
import axios from 'axios';
const uuidv1 = require('uuid/v1');

export const Progress = props => {
  const user = firebase.auth().currentUser;
  const [currentProgess, setCurrentProgress] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [max, setMax] = useState('');
  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const docRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    handleCurrentProgess(user.uid);
  }, []);

  const handleCurrentProgess = async uid => {
    const docRef = db.collection('users').doc(uid);
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        setCurrentProgress(doc.data());
        console.log(doc.data());
      } else {
        console.log('did not find');
      }
    });
  };

  const useStyles = makeStyles(progressStyle);

  const classes = useStyles();

  const addData = async (item, index) => {
    let payload;
    if (item === 'cardio') {
      payload = {
        time: time,
        distance: distance,
        date: new Date()
      };
    } else {
      payload = {
        reps: reps,
        sets: sets,
        max: max,
        date: new Date()
      };
    }
    await currentProgess.progress.exercise[index].data.push(payload);
    await docRef.set(currentProgess, { merge: true });
  };

  const setData = payload => {
    docRef.get().then(doc => {
      if (doc.exists) {
        currentProgess.progress.exercise.push(payload);
        docRef.set(currentProgess, { merge: true });
      } else docRef.set({ progress: { exercise: [payload] } });
    });
  };

  const Payload = async payload => {
    const categories = [];
    let information = {};

    if (
      payload.exercise_type === 'cardio' &&
      payload.time !== '' &&
      payload.distance !== ''
    ) {
      categories.push('time');
      categories.push('distance');
      information = {
        distance: payload.distance,
        distance_unit: payload.distanceUnit,
        time: payload.time,
        time_unit: payload.timeUnit,
        date: new Date()
      };
    } else if (
      payload.exercise_type === 'strength' &&
      payload.reps !== '' &&
      payload.sets !== '' &&
      payload.max !== ''
    ) {
      categories.push('reps');
      categories.push('sets');
      categories.push('max');
      information = {
        reps: payload.reps,
        sets: payload.sets,
        max: payload.max,
        date: new Date()
      };
    } else {
      throw new Error('Did fill all values');
    }

    const data = {
      name: payload.name,
      exercise_type: payload.exercise_type,
      id: uuidv1(),
      categories: categories,
      data: [information]
    };

    setData(data);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDistance = event => {
    setDistance(event.target.value);
  };

  const handleTime = event => {
    setTime(event.target.value);
  };

  const handleReps = event => {
    setReps(event.target.value);
  };
  const handleSets = event => {
    setSets(event.target.value);
  };
  const handleMax = event => {
    setMax(event.target.value);
  };

  const handleDialong = () => {
    setOpen(!open);
  };

  const handleRemoveToggle = () => {
    setRemove(!remove);
  };

  const handleRemoveData = async (item, ExIndex, DaIndex) => {
    await currentProgess.progress.exercise[ExIndex].data.splice(DaIndex, 1);

    docRef.set(currentProgess, { merge: true });
  };

  const handleDelete = index => {
    currentProgess.progress.exercise.splice(index, 1);

    docRef.set(currentProgess, { merge: true });
  };

  return (
    <div>
      <Paper
        className={classes.card}
        style={{ flexGrow: 1, marginBottom: '15px' }}
      >
        <Tabs
          scrollButtons='auto'
          value={tabValue}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
        >
          <Tab label='Create' />
          {currentProgess.length !== 0
            ? currentProgess.progress.exercise.map(workout => {
                return (
                  <Tab
                    key={`${workout.name}${workout.exercise}`}
                    label={workout.name}
                  />
                );
              })
            : null}
        </Tabs>
      </Paper>
      <Grid container alignContent='center' justify='center'>
        {tabValue === 0 ? <CreateExercise sendPayload={Payload} /> : null}
        {currentProgess.length !== 0
          ? currentProgess.progress.exercise.map((item, index) =>
              tabValue === index + 1 ? (
                <div key={index}>
                  {currentProgess.length !== 0 && tabValue !== 0 ? (
                    <Paper
                      className={classes.card}
                      style={{ flexGrow: 1, marginBottom: '15px' }}
                    >
                      <IconButton
                        onClick={handleDialong}
                        className={classes.whiteIcon}
                      >
                        <MdAdd />
                      </IconButton>
                      <IconButton
                        onClick={handleRemoveToggle}
                        className={classes.whiteIcon}
                      >
                        <MdRemove />
                      </IconButton>
                      <IconButton
                        className={classes.whiteIcon}
                        style={{ float: 'right' }}
                        onClick={() => handleDelete(index)}
                      >
                        <MdDelete />
                      </IconButton>
                    </Paper>
                  ) : null}
                  <Card>
                    <CardContent>
                      <Typography style={{ textAlign: 'center' }} variant='h6'>
                        {item.name}
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {remove ? (
                              <TableCell align='center'>Remove</TableCell>
                            ) : null}
                            {item.categories.map(category => {
                              return (
                                <TableCell align='center' key={category}>
                                  {category}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.data.map((progress, daIndex) => {
                            if (item.exercise_type === 'cardio') {
                              return (
                                <TableRow key={daIndex}>
                                  {remove ? (
                                    <TableCell align='center'>
                                      <IconButton
                                        onClick={() =>
                                          handleRemoveData(
                                            item.exercise,
                                            index,
                                            daIndex
                                          )
                                        }
                                      >
                                        <MdClose
                                          style={{
                                            height: '15px',
                                            color: 'red'
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  ) : null}
                                  <TableCell align='center'>
                                    {progress.distance}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {progress.time}
                                  </TableCell>
                                </TableRow>
                              );
                            } else {
                              return (
                                <TableRow key={daIndex}>
                                  {remove ? (
                                    <TableCell align='center'>
                                      <IconButton
                                        onClick={() =>
                                          handleRemoveData(
                                            item.exercise,
                                            index,
                                            daIndex
                                          )
                                        }
                                      >
                                        <MdClose
                                          style={{
                                            height: '15px',
                                            color: 'red'
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  ) : null}
                                  <TableCell align='center'>
                                    {progress.reps}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {progress.sets}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {progress.max}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Dialog open={open} onClose={handleDialong}>
                    <DialogContent>
                      {item.exercise_type === 'cardio' ? (
                        <div>
                          <TextField
                            className={classes.dialogCard}
                            autoFocus
                            margin='dense'
                            id='distance'
                            label='Distance'
                            type='text'
                            fullWidth
                            onChange={handleDistance}
                          />
                          <TextField
                            className={classes.dialogCard}
                            margin='dense'
                            id='time'
                            label='Time'
                            type='text'
                            fullWidth
                            onChange={handleTime}
                          />
                        </div>
                      ) : (
                        <div>
                          <TextField
                            className={classes.dialogCard}
                            autoFocus
                            margin='dense'
                            id='reps'
                            label='Reps'
                            type='text'
                            fullWidth
                            onChange={handleReps}
                          />
                          <TextField
                            className={classes.dialogCard}
                            margin='dense'
                            id='sets'
                            label='Sets'
                            type='text'
                            fullWidth
                            onChange={handleSets}
                          />
                          <TextField
                            className={classes.dialogCard}
                            margin='dense'
                            id='max'
                            label='Max'
                            type='text'
                            fullWidth
                            onChange={handleMax}
                          />
                        </div>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => addData(item.exercise, index)}>
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ) : null
            )
          : null}
      </Grid>
    </div>
  );
};
