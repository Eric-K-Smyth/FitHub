import { Link } from 'react-router-dom';
import { SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';


const Routines = ({
  title,
  showTitle = true
}) => {

  return (
    <div>
      {showTitle && <Heading size='md'>{title}</Heading>}
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <Card>
          <CardBody>

          </CardBody>
        </Card>
        
      </SimpleGrid>
    </div>
  );
};

export default Routines;
