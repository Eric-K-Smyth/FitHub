// import React, { useState } from 'react';
// import WorkoutBlock from '../WorkoutBlock';
// import './CustomRoutine.css';
// import { useMutation } from '@apollo/client';
// import { ADD_TO_ROUTINE } from '../../utils/mutations';

// const [addToRoutine] = useMutation(ADD_TO_ROUTINE);

// const CustomRoutine = () => {
//   const [selectedWorkouts, setSelectedWorkouts] = useState([]);

//   const addToRoutine = (workout) => {
//     if (selectedWorkouts.length < 6) {
//       setSelectedWorkouts([...selectedWorkouts, workout]);
//       // Call the mutation to update the database
//       addToRoutine({ variables: { workoutId: workout._id } })
//         .then(response => {
//           // Handle success
//         })
//         .catch(error => {
//           // Handle error
//           console.error("Error saving to routine:", error);
//         });
//     } else {
//       alert('You can add up to 6 workouts to your custom routine.');
//     }
//   };

//   // Function to remove a workout from the custom routine
//   const removeFromRoutine = (workout) => {
//     const updatedWorkouts = selectedWorkouts.filter(
//       (selectedWorkout) => selectedWorkout !== workout
//     );
//     setSelectedWorkouts(updatedWorkouts);
//   };

//   return (
//     <div className="custom-routine">
//       <h2>Your Custom Routine</h2>
//       <div className="routine-workouts">
//         {selectedWorkouts.map((workout) => (
//           <div key={workout._id} className="routine-workout">
//             <WorkoutBlock workout={workout} />
//             <button onClick={() => removeFromRoutine(workout)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomRoutine;
