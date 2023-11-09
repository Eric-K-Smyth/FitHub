import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const Routines = ({
  routines,
  title,
}) => {
  if (!routines.length) {
    return <h3>No Routines Yet</h3>;
  }
  console.log(routines);
  return (
    <div>
      <Text color={'gray.700'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'}>
          {title}
      </Text>
      {routines &&
        routines.map((routine) => (
          <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' mb='5'>
            <Box display='flex' alignItems='baseline'>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='sm' textTransform='uppercase' ml='2'>
              Routine {routine.name}
              </Box>
            </Box>
          </Box>
        ))}
    </div>
  );
};

export default Routines;
