import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { QUERY_ROUTINE } from '../../utils/queries';

const Routine = ({
  id,
  name
}) => {
  
  const { loading, data } = useQuery(QUERY_ROUTINE, {
    variables: { routineId: id },
  });

  const routine = data?.routine || {};
  //console.log(routine);
  return (
    <div>
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' mb='5'>
        <Box display='flex' alignItems='baseline'>
          <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='sm' textTransform='uppercase' ml='2'>
            Routine {name} 
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Routine;
