import { Link } from 'react-router-dom';
import { Stack, Text, Box } from '@chakra-ui/react';

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

const Height = ({
  height,
  title
}) => {

  return (
    <div>
       <Box align={'center'} boxShadow="base" background="white">
          <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} pt="2" mb="2">
             {title} 
          </Text>
        <StatGroup>
          <Stat>
            <StatLabel color={'gray.500'}>Overall</StatLabel>
            <StatNumber color={'gray.600'}>{height}</StatNumber>
            <StatHelpText>
              CM
            </StatHelpText>
          </Stat>
        </StatGroup>
        </Box>
    </div>
  );
};

export default Height;
