import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import Routine from './routine';

const Routines = ({
  routines,
  title,
}) => {
  if (!routines.length) {
    return <h3>No Routines Yet</h3>;
  }
  return (
    <div>
      <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} mb="2">
          {title}
      </Text>
      {routines &&
        routines.map((routine) => (
         
          <Routine
            key = {routine.id}
            routineId = {routine._id}
            name = {routine.name}
          />
          
        ))}
    </div>
  );
};

export default Routines;
