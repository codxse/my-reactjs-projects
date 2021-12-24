const graphql = require('graphql');
const {
  GraphQLObjectType,   // GraphQLObjectType
  GraphQLString,      // GraphQLString
  GraphQLID,          // GraphQLID
  GraphQLInt,         // GraphQLInt
  GraphQLList,        // GraphQLList
  GraphQLNonNull,     // GraphQLNonNull
  GraphQLBoolean,     // GraphQLBoolean
  GraphQLFloat,       // GraphQLFloat
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});