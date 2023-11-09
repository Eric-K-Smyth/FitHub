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
       <Box align={'center'}>
          <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} mb="2">
             {title} 
          </Text>
        <StatGroup border='1px' borderColor='gray.400' border-right='0px'>
          <Stat pt='3'>
            <StatLabel color={'gray.500'}>Overall</StatLabel>
            <StatNumber color={'gray.600'}>{height}</StatNumber>
            <StatHelpText>
              cm
            </StatHelpText>
          </Stat>
        </StatGroup>
        </Box>
    </div>
  );
};

export default Height;
