import { Link } from 'react-router-dom';
import { Box, Button,   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure, HStack, Badge, Image, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

const Workout = ({
  workout
}) => {

  const preview = (data) => {
    const previewLength = 70;
    if (data.length > previewLength) {
        return data.substring(0, previewLength) + '...';
    } else {
        return data;
    }
  };

  function ReadMore(data) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button size="xs" colorScheme='blackAlpha' onClick={onOpen}>Read More</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {data.instructions}
            </ModalBody>
            <ModalFooter>
              
              <Text fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>Sets: {data.sets} &bull; Reps: {data.reps} </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden' boxShadow='base' backgroundImage={workout.image}  backgroundSize="cover" backgroundRepeat="no-repeat" height='250px' position='relative'>
      <Box p='5' backgroundColor='blackAlpha.700' color='whiteAlpha.800' position="absolute" left='0' bottom='0'>
        <Box mt='1' fontWeight='semibold' as='h5' color='whiteAlpha.900' lineHeight='tight' noOfLines={1}>
          {workout.name}
        </Box>
        <Box fontSize="sm">
          {preview(workout.instructions)} 
        </Box>
        <Box display='flex' mt='2' alignItems='center' justifyContent='space-evenly' color='whiteAlpha.800' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
          <Box as='span' ml='2'>
            Sets: {workout.sets} minutes 
          </Box>
          <Box as='span' mr='2'>
           Reps: {workout.reps}
          </Box>
          <Box as='span'>
            {ReadMore(workout)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Workout;
