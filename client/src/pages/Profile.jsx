import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
import Weight from '../components/Weight';

import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

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
      <div className="flex-row justify-center mb-3">

        <div className="col-12 col-md-10 mb-5">
          <Weight
            bw_start = {user.bw_start}
            bw_current = {user.bw_current}
            bw_goal = {user.bw_goal}
            title={`Body Weight`}
            showUsername={false}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
