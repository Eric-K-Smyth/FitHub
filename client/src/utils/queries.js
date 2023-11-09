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

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
// `;
