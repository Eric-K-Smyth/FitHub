import { Link } from 'react-router-dom';
import { Stack, Text, Box, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

const Weight = ({
  bw_start,
  bw_current,
  bw_goal,
  title
}) => {

  return (
    <div>
       <Box align={'center'}>
          <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} mb="2">
             {title} 
          </Text>
        <StatGroup border='1px' borderColor='gray.400' pt='3'>
          <Stat>
            <StatLabel color={'gray.500'}>Start</StatLabel>
            <StatNumber color={'gray.600'}>{bw_start}</StatNumber>
            <StatHelpText>
              KG
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel color={'gray.500'}>Current</StatLabel>
            <StatNumber color={'gray.600'}>{bw_current}</StatNumber>
            <StatHelpText>
             KG
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel color={'gray.500'}>Goal</StatLabel>
            <StatNumber color={'gray.600'}>{bw_goal}</StatNumber>
            <StatHelpText>
              KG
            </StatHelpText>
          </Stat>
        </StatGroup>
        </Box>
    </div>
  );
};

export default Weight;
