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
    dietary: String
    routines: [Routines]
    calendar: [String]
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
    profile: Profile
    customeRoutine(routineName: String): Routines
    routines(routineId: ID!): Routines
    workouts: [Workouts]
    workoutsByRoutine(routineId: ID!): [Workouts]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createProfile(_id: ID!, username: String, height: Int!, payMember: Boolean, bw_start: Int!, bw_current: Int, bw_goal: Int!, dietary: String, routines: [String], calendar: [String]): Profile
    addDateToCalendar(username: String!, date: String!): Profile
    createRoutine(name: String!): Routines
    addWorkoutToRoutine(workoutId: ID!, routineId: ID!): Routines
    addRoutineToProfile(username: String!,routineId: ID!): Profile
  }
`;

module.exports = typeDefs;
