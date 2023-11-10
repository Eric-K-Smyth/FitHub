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
mutation Mutation($id: ID!, $height: Int!, $bwStart: Int!, $username: String, $payMember: Boolean, $dietary: [String], $routines: [String], $calendar: [String], $bwCurrent: Int, $bwGoal: Int!) {
  createProfile(_id: $id, height: $height, bw_start: $bwStart, username: $username, payMember: $payMember, dietary: $dietary, routines: $routines, calendar: $calendar, bw_current: $bwCurrent, bw_goal: $bwGoal) {
    _id
    bw_current
    bw_goal
    bw_start
    calendar
    dietary {
      _id
    }
    height
    payMember
    routines {
      _id
    }
    username
  }
}`;

// we need all the mutations from the typedef/resolvers
