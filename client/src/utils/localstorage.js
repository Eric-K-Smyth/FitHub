export const saveWorkoutsIds = (workoutIdArr) => {
    if (workoutIdArr.length) {
      localStorage.setItem('saved_workouts', JSON.stringify(workoutIdArr));
    } else {
      localStorage.removeItem('saved_workouts');
    }
  };

export const getSavedWorkoutIds = () => {
  const savedWorkoutIds = localStorage.getItem('saved_workouts')
    ? JSON.parse(localStorage.getItem('saved_workouts'))
    : [];

  return savedWorkoutIds;
};