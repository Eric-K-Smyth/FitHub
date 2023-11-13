import React, { useEffect, useState } from 'react';
import './WorkoutBlock.css';
import { useMutation } from '@apollo/client';
import { ADD_WORKOUT_TO_ROUTINE } from '../../utils/mutations';
import { saveWorkoutsIds ,getSavedWorkoutIds } from '../../utils/localstorage';




const WorkoutBlock = ({ workout, routineId }) => {
  const [expanded, setExpanded] = useState(false);


    // create state to hold saved workoutId values
    const [savedIds, setSavedIds] = useState(getSavedWorkoutIds());

    const [ addWorkout, {error_add_workout, data_add_workout} ] = useMutation(ADD_WORKOUT_TO_ROUTINE);

    // useEffect(() => {
    //   return () => saveWorkoutsIds(savedWorkouIds);
    // });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getDescriptionPreview = () => {
    const words = workout.instructions.split(' ');
    if (expanded) {
      return words.join(' ');
    } else {
      return words.slice(0, 10).join(' ');
    }
  };

  const addToCustomRoutine = async (id) => {

    let payload_to_mongo = {
      workoutId: id,
      routineId: routineId
    }

    try {

      await addWorkout({variables :{...payload_to_mongo}});
      // if successfully saves to localstorage the ids to change the button states
      let repeater = getSavedWorkoutIds();
      saveWorkoutsIds([...repeater, id]);
      setSavedIds(getSavedWorkoutIds());
      console.log(savedIds)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {savedIds?.some((savedId) => savedId === workout._id)
      ? 
      <div className="workout-block" style={{ backgroundImage: `url(${workout.image})` }}>
      <div className="workout-content">
        <h3>{workout.name}</h3>
        <h5 >
          Already saved
        </h5>
      </div>
    </div>
      :
    <div className="workout-block" style={{ backgroundImage: `url(${workout.image})` }}>
      <div className="workout-content">
        <h3>{workout.name}</h3>
        <p>Category: {workout.category}</p>
        <p>Sets: {workout.sets}</p>
        <p>Reps: {workout.reps}</p>
        <div className={`description ${expanded ? 'expanded' : ''}`}>
          <p>{workout.instructions}</p>
        </div>
        {!expanded && (
          <div className="save-button-container">
            <button
            className="save-button" onClick={() =>addToCustomRoutine(workout._id)}>
            {savedIds?.some((savedId) => savedId === workout._id)
                          ? 'Already saved!'
                          : 'Save to Routine!'
                          }
              
              </button>
          </div>
        )}
        <button className="expand-button" onClick={toggleExpand}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  }
  </>
  );
};

export default WorkoutBlock;
