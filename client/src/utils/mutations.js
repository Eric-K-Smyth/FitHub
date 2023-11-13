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
mutation Mutation($id: ID!, $height: Int!, $bwStart: Int!, $bwGoal: Int!, $username: String, $payMember: Boolean, $bwCurrent: Int, $dietary: String, $routines: [String], $calendar: [String]) {
  createProfile(_id: $id, height: $height, bw_start: $bwStart, bw_goal: $bwGoal, username: $username, payMember: $payMember, bw_current: $bwCurrent, dietary: $dietary, routines: $routines, calendar: $calendar) {
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
    }
    calendar
  }
}
`;

export const ADD_WORKOUT_TO_ROUTINE = gql`
mutation AddWorkoutToRoutine($workoutId: ID!, $routineId: ID!) {
  addWorkoutToRoutine(workoutId: $workoutId, routineId: $routineId) {
    name
    workouts {
      _id
    }
  }
}
`;

// we need all the mutations to add workouts from the routines
