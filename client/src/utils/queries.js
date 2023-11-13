import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROFILE = gql`
  query profile {
    profile {
      _id
      username
      height
      payMember
      bw_start
      bw_current
      bw_goal
      dietary
      routines {
        _id
        name
      }
      calendar
    }
  }
`;

export const QUERY_ROUTINE = gql`
  query getRoutine($routineId: ID!) {
    routines(routineId: $routineId) {
      _id
      name
      workouts {
        name
        category
        instructions
        image
        sets
        reps
      }
    }
  }
`;

export const GET_CUSTOME_ROUTINEID = gql`
  query CustomeRoutine($routineName: String) {
    customeRoutine(routineName: $routineName) {
      _id
    }
  }
`;

export const GET_WORKOUTS_BY_ROUTINE = gql`
  query GetWorkoutsByRoutine($routineId: ID!) {
    workoutsByRoutine(routineId: $routineId) {
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
