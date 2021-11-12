const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
q = faunadb.query;
const dotenv = require("dotenv");
dotenv.config();

// Fauna Db Connection //
const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
  domain: "db.us.fauna.com",
});

const typeDefs = gql`
  type Query {
    hello: String
    getLollyByPath(lollyPath: String!): Lolly
  }
  type Lolly {
    resciever: String!
    message: String!
    sender: String!
    color1: String!
    color2: String!
    color3: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly(
      resciever: String!
      message: String!
      sender: String!
      color1: String!
      color2: String!
      color3: String!
      lollyPath: String!
    ): Lolly
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, Lolly!";
    },
    getLollyByPath: async (_, { args }) => {
      const result = await client.query(q.Get(q.Match(q.Index("data"), args)));
      return result.data;
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      const result = await client.query(
        q.Create(q.Collection("lollyData"), {
          data: args,
        })
      );
      console.log('result===>>>', result.data)
      return result.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();
module.exports = { handler };
