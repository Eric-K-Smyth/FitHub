import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import Workout from './workout';

import { GET_WORKOUTS_BY_ROUTINE } from '../../utils/queries';

const Routine = ({ routineId, name }) => {
  
  const { loading, data } = useQuery(GET_WORKOUTS_BY_ROUTINE, {
    variables: { routineId },
  });

  const workouts = data || [];
  console.log(workouts);   
  return (
    <div>
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' mb='5'>
        <Box display='flex' alignItems='baseline'>
          <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='sm' textTransform='uppercase' ml='2'>
            Routine {name} 
          </Box>
        </Box>
      </Box>

      <SimpleGrid spacing={2} templateColumns='repeat(3, 1fr)' alignItems='center'>
       
        {/* {workouts.map((workoutdata) => {
           <Workout key={workoutdata.id} workout={workoutdata} />;
        })} */}
      </SimpleGrid>

    </div>
  );
};

export default Routine;
