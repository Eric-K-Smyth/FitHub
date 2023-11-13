import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Weight from '../components/Weight';
import Height from '../components/Weight/height';
import Routines from '../components/Routines';
import QuoteComponent from '../components/QuoteGen';
import MealPlan from '../components/MealPlans/mealplan';

import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';
import { CREATE_ROUTINE, ADD_ROUTINE_TO_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';
import { Grid, GridItem, Heading, Box, Button, Text, Divider, HStack, VStack,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure} from '@chakra-ui/react';

const Profile = () => {
  const { username: userParam } = useParams();
  const navigate = useNavigate();
  // if (!userParam) {
  //   userParam = Auth.getProfile().authenticatedPerson.username;
  // }
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_PROFILE, {
    variables: { username: userParam },
  });

  const [createRoutine] = useMutation(CREATE_ROUTINE);
  const [addRoutine] = useMutation(ADD_ROUTINE_TO_PROFILE);
  const { isOpen, onOpen, onClose } = useDisclosure();

    //initialize new Routine FormState
    const [formData, setFormData] = useState({
      name: ''
    });

  const user = data?.profile || data?.user || {};
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see profile. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  const donatePage = () => {
    console.log(user.payMember);
      navigate('/donate');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('pushing form create routine as:');
    console.log(formData);
    try {
      const { data } = await createRoutine({
        variables: {
          ...formData
        },
      });
    
        console.log('Routine created. Data:', data.createRoutine);  

        await addRoutine({
          variables:{
            username: Auth.getProfile().authenticatedPerson.username,
            routineId: data.createRoutine._id
          }
        });

        localStorage.removeItem('empty_routineId');
        localStorage.removeItem('saved_workouts');
        localStorage.setItem('empty_routineId', JSON.stringify(data.createRoutine._id));
        navigate('/custom');
      } catch (e) {
        console.error('Error submitting form:', e);
      }
  };
 
  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
      setFormData({
        [name]: e.target.value,
      });
  };

  return (
    <div>
       <Grid templateColumns="repeat(9,1fr)">
        <GridItem as="aside" colSpan="2" minHeight="100hv" padding='15px'>
          <VStack align="left">
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Welcome {Auth.getProfile().authenticatedPerson.username}
            </Heading>
            <Button colorScheme='blue' onClick={donatePage} mb='10px'>Donate here</Button>
            
            <QuoteComponent></QuoteComponent>
            
          </VStack>
             
        </GridItem>
        <GridItem as="main" colSpan="7" padding='15px'>
          <Grid templateColumns="repeat(4,1fr)">
            <GridItem colSpan="1">
                <Height
                  height= {user.height}
                  title = { 'Height'} 
                />
            </GridItem>
            <GridItem colSpan="3">
              <Weight
                bw_start = {user.bw_start}
                bw_current = {user.bw_current}
                bw_goal = {user.bw_goal}
                title = {`Body Weight`}

              />
            </GridItem>
          </Grid>
          
          <Routines
              title={`Routines`}
              routines= {user.routines}
          />
          <Button colorScheme='blue' onClick={onOpen}>Create Routine</Button>
          
          { <MealPlan 
            title= {'Suggested Meals'}
            selectedDiet={user.dietary} /> }
          
        </GridItem>
        
       </Grid>

       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Routine</ModalHeader>
          <ModalCloseButton />
          <div className="questionnaire">
          <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Pick a Name</label>
          <br></br>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Create Routine</button>
        </form>
        </div>
          
        </ModalContent>
      </Modal>

    </div>
  );
};

export default Profile;
