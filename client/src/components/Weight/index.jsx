import { Link } from 'react-router-dom';
import { Box, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

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
  title,
  showTitle = true
}) => {

  return (
    <div>
      
      
      <SimpleGrid spacing={2} templateColumns='repeat(2, 1fr)' alignItems='center'>
        <Box>
          {showTitle && <Heading size='md'>{title}</Heading>}
        </Box>
        <Card>
          <StatGroup>
            <Stat>
              <StatLabel>Start</StatLabel>
              <StatNumber>{bw_start}</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Current</StatLabel>
              <StatNumber>{bw_current}</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Goal</StatLabel>
              <StatNumber>{bw_goal}</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default Weight;
