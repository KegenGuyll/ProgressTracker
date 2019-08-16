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
  List,
  ListItem,
  FormControl,
  InputLabel,
  TextField,
  MobileStepper,
  Button,
  NativeSelect,
  Input,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Dialog,
  Slide,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { MdAdd, MdRemove, MdDelete, MdClose } from 'react-icons/md';
import { progressStyle } from './style';

export const Progress = props => {
  const user = firebase.auth().currentUser;
  const [currentProgess, setCurrentProgress] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState('');
  const [exercise, setExercise] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [max, setMax] = useState('');
  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);

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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const useStyles = makeStyles(progressStyle);

  const classes = useStyles();

  const clearForm = async () => {
    setName('');
    setDistance('');
    setExercise('');
    setMax('');
    setReps('');
    setSets('');
    setTime('');
    setActiveStep(0);
  };

  const addProgress = () => {
    const docRef = db.collection('users').doc(user.uid);
    let payload;
    if (currentProgess.length === 0) {
      if (exercise === 'cardio') {
        payload = {
          name: name,
          id: 1,
          exercise: exercise,
          data: [
            {
              distance: distance,
              time: time
            }
          ]
        };
      } else {
        payload = {
          name: name,
          id: 1,
          exercise: exercise,
          data: [
            {
              reps: reps,
              sets: sets,
              max: max
            }
          ]
        };
      }
    } else {
      if (exercise === 'cardio') {
        payload = {
          name: name,
          id: currentProgess.progress.exercise.length + 1,
          exercise: exercise,
          data: [
            {
              distance: distance,
              time: time
            }
          ]
        };
      } else {
        payload = {
          name: name,
          id: currentProgess.progress.exercise.length + 1,
          exercise: exercise,
          data: [
            {
              reps: reps,
              sets: sets,
              max: max
            }
          ]
        };
      }
    }

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          currentProgess.progress.exercise.push(payload);
          docRef.set(currentProgess);
        } else {
          docRef.set({
            progress: {
              exercise: [payload]
            }
          });
        }
      })
      .then(() => {
        console.log('added successfully');
        clearForm();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const addData = async (item, index) => {
    let payload;
    if (item === 'cardio') {
      payload = {
        time: time,
        distance: distance
      };
    } else {
      payload = {
        reps: reps,
        sets: sets,
        max: max
      };
    }

    await currentProgess.progress.exercise[index].data.push(payload);
    handleDialong();

    const docRef = db.collection('users').doc(user.uid);

    docRef.set(currentProgess, { merge: true });
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  const handleDistance = event => {
    setDistance(event.target.value);
  };

  const handleTime = event => {
    setTime(event.target.value);
  };

  const handleExercise = event => {
    setExercise(event.target.value);
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
    clearForm();
    setOpen(!open);
  };

  const handleRemoveToggle = () => {
    setRemove(!remove);
  };

  const handleRemoveData = async (item, ExIndex, DaIndex) => {
    await currentProgess.progress.exercise[ExIndex].data.splice(DaIndex, 1);
    const docRef = db.collection('users').doc(user.uid);
    docRef.set(currentProgess, { merge: true });
  };

  const handleDelete = index => {
    currentProgess.progress.exercise.splice(index, 1);

    const docRef = db.collection('users').doc(user.uid);

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
        {tabValue === 0 ? (
          <Card className={classes.card}>
            <CardContent>
              <Typography style={{ textAlign: 'center' }} variant='h6'>
                Create a exercise to track
              </Typography>
              <List>
                {activeStep === 0 ? (
                  <ListItem>
                    <FormControl className={classes.root} fullWidth>
                      <TextField
                        label='Name'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleName}
                        value={name}
                      />
                    </FormControl>
                  </ListItem>
                ) : null}
                {activeStep === 1 ? (
                  <ListItem>
                    <InputLabel
                      style={{ color: '#fff' }}
                      fullWidth
                      htmlFor='exercise-native-helper'
                    >
                      Type of Exercise
                    </InputLabel>
                    <FormControl className={classes.root} fullWidth>
                      <NativeSelect
                        value={exercise}
                        onChange={handleExercise}
                        input={
                          <Input
                            name='Type of Exercise'
                            id='exercise-native-helper'
                          />
                        }
                      >
                        <option value='' />
                        <option value='strength'>Strength</option>
                        <option value='cardio'>Cardio</option>
                      </NativeSelect>
                    </FormControl>
                  </ListItem>
                ) : null}
                {activeStep === 2 && exercise === 'cardio' ? (
                  <ListItem>
                    <FormControl className={classes.root} fullWidth>
                      <TextField
                        label='Distance'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleDistance}
                        value={distance}
                      />
                    </FormControl>
                  </ListItem>
                ) : null}
                {activeStep === 3 && exercise === 'cardio' ? (
                  <ListItem>
                    <FormControl className={classes.root} fullWidth>
                      <TextField
                        label='Time taken'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleTime}
                        value={time}
                      />
                    </FormControl>
                  </ListItem>
                ) : null}
                {activeStep === 2 && exercise === 'strength' ? (
                  <ListItem>
                    <FormControl className={classes.root} fullWidth>
                      <TextField
                        label='Reps'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleReps}
                        value={reps}
                      />
                      <TextField
                        label='Sets'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleSets}
                        value={sets}
                      />
                    </FormControl>
                  </ListItem>
                ) : null}
                {activeStep === 3 && exercise === 'strength' ? (
                  <ListItem>
                    <FormControl className={classes.root} fullWidth>
                      <TextField
                        label='Max weight lifted'
                        placeholder='Exercise'
                        type='text'
                        onChange={handleMax}
                        value={max}
                      />
                    </FormControl>
                  </ListItem>
                ) : null}
              </List>
            </CardContent>
            <MobileStepper
              className={classes.progress}
              variant='progress'
              steps={4}
              position='static'
              activeStep={activeStep}
              nextButton={
                activeStep !== 3 ? (
                  <Button
                    onClick={handleNext}
                    disabled={activeStep === 3}
                    size='small'
                  >
                    Next
                  </Button>
                ) : (
                  <Button size='small' onClick={addProgress}>
                    Create
                  </Button>
                )
              }
              backButton={
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  size='small'
                >
                  Back
                </Button>
              }
            />
          </Card>
        ) : null}

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
                            <TableCell align='center'>
                              {item.exercise === 'cardio' ? 'Distance' : 'Reps'}
                            </TableCell>
                            <TableCell align='center'>
                              {item.exercise === 'cardio' ? 'Time' : 'Sets'}
                            </TableCell>
                            {item.exercise === 'strength' ? (
                              <TableCell align='center'>Max</TableCell>
                            ) : null}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.data.map((progress, daIndex) => {
                            if (item.exercise === 'cardio') {
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
                      {item.exercise === 'cardio' ? (
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
