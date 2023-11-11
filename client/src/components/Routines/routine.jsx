import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import Workout from './workout';

import { GET_WORKOUTS_BY_ROUTINE } from '../../utils/queries';

const Routine = ({ routineId, name }) => {
  
  const { loading, data } = useQuery(GET_WORKOUTS_BY_ROUTINE, {
    variables: { routineId },
  });

  // Ensure data and workoutsByRoutine exist before trying to access workouts
  const allWorkouts = data && data.workoutsByRoutine ? data.workoutsByRoutine : [];
  const workouts = allWorkouts.slice(0, Math.min(allWorkouts.length, 6));

  return (
    <div>
      <Box borderWidth='1px' overflow='hidden' p='5' mb='5' boxShadow="base" background="white">
        <Box display='flex' alignItems='baseline' mb='2'>
          <Box color='gray.600' fontWeight='semibold' letterSpacing='wide' fontSize='sm' textTransform='uppercase' ml='2'>
            Routine {name} 
          </Box>
        </Box>
        
        <SimpleGrid spacing={2} templateColumns='repeat(3, 1fr)' alignItems='center'>
          
          {workouts.length > 0 ? (
            workouts.map(workout => (
              <div key={workout._id}>
                <Workout key={workout._id} workout={workout} />
              </div>
            ))
          ) : (
            <span>No workouts available for this routine.</span>
          )}
          {workouts.map((workoutdata) => {
            {workoutdata}
            <Workout key={workoutdata.id} workout={workoutdata} />;
          })}
        </SimpleGrid>
      </Box>

    </div>
  );
};

export default Routine;
