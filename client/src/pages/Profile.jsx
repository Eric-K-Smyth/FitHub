import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Weight from '../components/Weight';
import Height from '../components/Weight/height';
import Routines from '../components/Routines';
import QuoteComponent from '../components/QuoteGen';
import MealPlan from '../components/MealPlans/mealplan';

import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';

import Auth from '../utils/auth';
import { Grid, GridItem, Heading, Box, Button, Text, Divider, HStack, VStack } from '@chakra-ui/react';

const Profile = () => {
  const { username: userParam } = useParams();
  const navigate = useNavigate();
  // if (!userParam) {
  //   userParam = Auth.getProfile().authenticatedPerson.username;
  // }
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_PROFILE, {
    variables: { username: userParam },
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
      navigate('/donate');
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
          
          {/* <MealPlan 
            title= {'Suggested Meals'}
            selectedDiet={user.dietary} /> */}
          
        </GridItem>
        
       </Grid>

    </div>
  );
};

export default Profile;
