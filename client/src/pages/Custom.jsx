import React ,{ useEffect, useState }from 'react';
import { useQuery } from '@apollo/client';
import { GET_WORKOUTS, GET_CUSTOME_ROUTINEID } from '../utils/queries';
import WorkoutBlock from '../components/WorkoutBlock';
// import CustomRoutine from '../components/CustomRoutine';
import './Style.css';

const Custom = () => {
  const { loading, error, data } = useQuery(GET_WORKOUTS);

  // create state to hold saved routineId value
const [ routineId, setRoutineId] = useState({});

// const { data: data_customeRoutineId } = useQuery(GET_CUSTOME_ROUTINEID,{
//   variables: { routineName: "Custom Routine" }
// });
const data_customeRoutineId = JSON.parse(localStorage.getItem('empty_routineId'));

useEffect(() => {
  // Only update the state if data_customRoutineId has changed
  if (data_customeRoutineId && data_customeRoutineId !== routineId) {
    setRoutineId(data_customeRoutineId);
    console.log(`CustomRoutine Id: ${data_customeRoutineId}`);
  }
}, [data_customeRoutineId]);


if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;


  const workoutsByCategory = {};

  data.workouts.forEach((workout) => {
    const category = workout.category;

    if (!workoutsByCategory[category]) {
      workoutsByCategory[category] = [];
    }

    workoutsByCategory[category].push(workout);
  });

  return (
    <div className="workout-container">
        {/* <CustomRoutine /> */}
      {Object.entries(workoutsByCategory).map(([category, workouts]) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="workout-rows">
            {workouts.map((workout) => (
              <WorkoutBlock key={workout._id} workout={workout} routineId={routineId}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Custom;
