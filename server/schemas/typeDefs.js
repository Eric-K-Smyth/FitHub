const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Profile {
    _id: ID
    username: String
    height: Int
    payMember: Boolean
    bw_start: Int
    bw_current: Int
    bw_goal: Int
    dietary: [Diets]
    routines: [Routines]
  }

  type Diets {
    _id: ID
    name: String!
    createdAt: String
  }

  type Routines {
    _id: ID
    name: String!
    workouts: [Workouts]
  }

  type Workouts {
    _id: ID
    name: String!
    category: String
    instructions: String
    image: String
    sets: Int
    reps: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
    profiles: [Profile]
    profile: Profile
    dietary(username: String): [Diets]
    diet(dietId: ID!): Diets
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createProfile(_id: ID!, username: String, height: Int!, payMember: Boolean, bw_start: Int!, bw_current: Int, bw_goal: Int!, dietary: String, routines: String): Profile
  }
`;
//we need typeDef for Calendar
// we need mutations for profile (add routines to profile)
// we need mutation for calendar (add date to calender)
module.exports = typeDefs;
