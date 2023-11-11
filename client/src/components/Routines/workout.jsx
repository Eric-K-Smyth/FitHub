import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

const Workout = ({
  workout
}) => {

  console.log(workout);   
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={workout.image} alt={workout.name} />
      <Box p='5'>
        <Box mt='1' fontWeight='semibold' as='h5' lineHeight='tight' noOfLines={1}>
          <a href={workout.sourceUrl}>{workout.name}</a>
        </Box>
        <Box display='flex' mt='2' alignItems='center' justifyContent='space-evenly' color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
          <Box as='span' ml='2'>
            Sets: {workout.sets} minutes
          </Box>
          <Box as='span' mr='2'>
           Reps: {workout.reps}
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Workout;
