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
    <Box mt='10px' mb='10px'>
      <Text align="left" color={'gray.700'} fontWeight={600} fontSize={'lg'}  mb="2">
          {title}
      </Text>
      {routines &&
        routines.map((routine) => (
          <Routine
            key = {routine._id}
            routineId = {routine._id}
            name = {routine.name}
          />
        ))}
      </Box>
  );
};

export default Routines;
