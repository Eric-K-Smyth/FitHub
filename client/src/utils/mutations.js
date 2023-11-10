import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation createProfile(
    $id: ID!, 
    $username: String, 
    $height: Int, 
    $payMember: Boolean, 
    $bw_start: Int, 
    $bw_current: Int, 
    $bw_goal: Int, 
    $dietary: [ID], 
    $routines: [ID],
  ) {
    createProfile(
      id: $id, 
      username: $username,
      height: $height, 
      payMember: $payMember, 
      bw_start: $bw_start, 
      bw_current: $bw_current, 
      bw_goal: $bw_goal, 
      dietary: $dietary, 
      routines: $routines, 
    ) {
      _id, 
      username, 
      height, 
      payMember, 
      bw_start, 
      bw_current, 
      bw_goal, 
      dietary {
        _id, 
        name, 
        createdAt, 
      }
      routines {
        _id, 
        name, 
      }
    }
  }
`;

// we need all the mutations from the typedef/resolvers
