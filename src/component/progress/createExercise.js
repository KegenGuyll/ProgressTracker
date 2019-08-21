import React, { useState, useEffect } from 'react';
import { progressStyle } from './style';
import { makeStyles } from '@material-ui/core/styles';
import {
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
  Input
} from '@material-ui/core';

const CreateExercise = props => {
  const [exercise, setExercise] = useState('');
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [max, setMax] = useState('');
  const [name, setName] = useState('');

  const useStyles = makeStyles(progressStyle);

  const classes = useStyles();

  const clearForm = async () => {
    setName('');
    setDistance('');
    setDistanceUnit('');
    setExercise('');
    setMax('');
    setReps('');
    setSets('');
    setTime('');
    setTimeUnit('');
    setActiveStep(0);
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
  const handleDistanceUnit = event => {
    setDistanceUnit(event.target.value);
  };
  const handleTimeUnit = event => {
    setTimeUnit(event.target.value);
  };

  const sendPayload = async () => {
    const payload = {
      name: name,
      distance: distance,
      distance_unit: distanceUnit,
      time: time,
      time_unit: timeUnit,
      exercise_type: exercise,
      reps: reps,
      sets: sets,
      max: max
    };
    await clearForm();
    props.sendPayload(payload);
  };

  return (
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
                <TextField
                  label='Unit'
                  placeholder='Unit of distance'
                  type='text'
                  onChange={handleDistanceUnit}
                  value={distanceUnit}
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
                <TextField
                  label='Unit'
                  placeholder='Unit of time'
                  type='text'
                  onChange={handleTimeUnit}
                  value={timeUnit}
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
            <Button size='small' onClick={sendPayload}>
              Create
            </Button>
          )
        }
        backButton={
          <Button onClick={handleBack} disabled={activeStep === 0} size='small'>
            Back
          </Button>
        }
      />
    </Card>
  );
};

export default CreateExercise;
