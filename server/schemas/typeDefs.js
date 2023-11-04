const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    height: Int
    payMember: Boolean
    bw_start: Int
    bw_current: Int
    bw_goal: Int
    dietary: [Diets]
    routines: [Routines]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Diets {
    _id: ID
    name: String!
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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    
  }
`;

module.exports = typeDefs;
