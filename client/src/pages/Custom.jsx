import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WORKOUTS } from '../utils/queries';
import WorkoutBlock from '../components/WorkoutBlock';
// import CustomRoutine from '../components/CustomRoutine';
import './Custom.css';

const Custom = () => {
  const { loading, error, data } = useQuery(GET_WORKOUTS);

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
              <WorkoutBlock key={workout._id} workout={workout} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Custom;
