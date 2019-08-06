import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  MobileStepper,
  Button,
  NativeSelect,
  Input
} from '@material-ui/core';

export const Progress = props => {
  const user = firebase.auth().currentUser;
  const [currentProgess, setCurrentProgress] = useState({});
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
    await docRef.get().then(doc => {
      if (doc.exists) {
        setCurrentProgress(doc.data());
      } else {
        return 'not found';
      }
    });
  };

  const addProgress = () => {
    const docRef = db.collection('users').doc(user.uid);
    let payload;
    if (exercise === 'cardio') {
      payload = {
        exercises: [
          {
            name: name,
            exercise: exercise,
            distance: distance,
            time: time
          }
        ]
      };
    } else {
      payload = {
        exercises: [
          {
            name: name,
            exercise: exercise,
            reps: reps,
            sets: sets,
            max: max
          }
        ]
      };
    }

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          //TODO ADD DATA
        } else {
          //TODO SET DATA
          docRef.set({ fitness: payload });
        }
      })
      .then(() => {
        return console.log('added successfully');
      })
      .catch(e => {
        return e;
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
      <Paper style={{ flexGrow: 1 }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Create' />
        </Tabs>
      </Paper>
      <Grid container alignContent='center' justify='center'>
        {tabValue === 0 ? (
          <Card style={{ minWidth: '350px' }}>
            <CardContent>
              <Typography variant='h6'> Create a exercise to track </Typography>
              <List>
                {activeStep === 0 ? (
                  <ListItem>
                    <FormControl fullWidth>
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
                    <InputLabel htmlFor='exercise-native-helper'>
                      Type of Exercise
                    </InputLabel>
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
      </Grid>
    </div>
  );
};
