import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

// we need all the queries from the typedef/resolvers

export const QUERY_PROFILE = gql`
  query profile {
    profile {
      _id
      username
      height
      weight
      payMember
      bw_start
      bw_current
      bw_goal
      dietary {
        _id
        name
        createdAt
      }
      routines {
        _id
        name
      }
      calendar 
    }
  }
`;

export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      _id
      name
      category
      instructions
      image
      sets
      reps
    }
  }
`;
