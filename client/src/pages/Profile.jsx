import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
import Weight from '../components/Weight';
import Height from '../components/Weight/height';
import Routines from '../components/Routines';
import QuoteComponent from '../components/QuoteGen';
import MealPlan from '../components/MealPlans/mealplan';

import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';

import Auth from '../utils/auth';
import { Grid, GridItem, Heading, Box, Text, Divider } from '@chakra-ui/react';

const Profile = () => {
  const { username: userParam } = useParams();
  
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
  
  return (
    <div>
       <Grid templateColumns="repeat(6,1fr)">
        <GridItem as="aside" colSpan="1" minHeight="100hv">
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} textAlign={'left'}>
              {Auth.getProfile().authenticatedPerson.username}
            </Heading>
        </GridItem>
        <GridItem as="main" colSpan="5">
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
          <Box p="10px">
            <Divider color={'gray.700'} borderBottomWidth="2px" opacity="1" mt="5px" mb="10px"></Divider>
            <QuoteComponent></QuoteComponent>
            <Divider color={'gray.700'} borderBottomWidth="2px" opacity="1" mt="10px" mb="5px"></Divider>
          </Box>
          
          <Routines
              title={`Routines`}
              routines= {user.routines}
          />
          <Box>
            <Text color={'gray.600'} fontWeight={600} fontSize={'sm'} textTransform={'uppercase'} mb="2">
              Suggested Meals
            </Text>
                <MealPlan selectedDiet={user.dietary} />
          </Box>
          

        </GridItem>
        
       </Grid>

    </div>
  );
};

export default Profile;
