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
 // console.log(routines);
  return (
    <div>
      <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} mb="2">
          {title}
      </Text>
      {routines &&
        routines.map((routine) => (
          <Routine
            id = {routine._id}
            name = {routine.name}
          />
        ))}
    </div>
  );
};

export default Routines;
