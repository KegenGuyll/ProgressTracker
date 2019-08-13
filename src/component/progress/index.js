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
  TableBody
} from '@material-ui/core';

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

  useEffect(() => {
    handleCurrentProgess(user.uid);
  }, []);

  const handleCurrentProgess = async uid => {
    const docRef = db.collection('users').doc(uid);
    // docRef.get().then(doc => {
    //   if (doc.exists) {
    //     setCurrentProgress(doc.data());
    //     console.log(doc.data());
    //   } else {
    //     console.log('did not find');
    //   }
    // });
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        setCurrentProgress(doc.data());
        console.log(doc.data());
      } else {
        console.log('did not find');
      }
    });
  };

  const useStyles = makeStyles({
    card: {
      background: '#323232',
      color: '#fff',
      minWidth: '350px',
      marginBottom: '5px',
      '& .MuiMobileStepper-root': {
        background: '#424242'
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#fff'
      },
      '& .MuiTabs-indicator': {
        backgroundColor: '#fff'
      },
      '& .MuiTab-textColorPrimary': {
        color: 'rgba(255, 255, 255, 0.54)'
      }
    },
    root: {
      '& label.Mui-focused': {
        color: '#c3c3c3'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff'
      },
      '& .MuiInputBase-input': {
        color: '#b0b0b0'
      },
      '& .MuiFormLabel-root': {
        color: '#c3c3c3'
      }
    },
    progress: {
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: '#fff'
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#212121'
      },
      '& .MuiButton-root': {
        color: '#fff'
      },
      '& .MuiButton-root.Mui-disabled': {
        color: '#5a5a5a'
      }
    }
  });

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
          //TODO ADD DATA
          currentProgess.progress.exercise.push(payload);
          docRef.set(currentProgess);
        } else {
          //TODO SET DATA
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
          ? currentProgess.progress.exercise.map(item =>
              tabValue === item.id ? (
                <Card key={item.id}>
                  <CardContent>
                    <Typography style={{ textAlign: 'center' }} variant='h6'>
                      {item.name}
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
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
                        {item.exercise === 'cardio'
                          ? item.data.map(progress => {
                              return (
                                <TableRow key={progress.distance}>
                                  <TableCell align='center'>
                                    {progress.distance}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {progress.time}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          : item.data.map(progress => {
                              return (
                                <TableRow key={progress.max}>
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
                            })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : null
            )
          : null}
      </Grid>
    </div>
  );
};
