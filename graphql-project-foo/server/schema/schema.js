const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList} = graphql

const USER_DATA = [
  {id: '1', name: 'Andy', age: 12, profession: 'Actres'},
  {id: '2', name: 'Meruem', age: 2, profession: 'Bad Guy'},
  {id: '3', name: 'Gon', age: 12, profession: 'Main Actor'},
  {id: '4', name: 'Kilua', age: 13, profession: 'Main Actor'},
  {id: '5', name: 'Kurapika', age: 16, profession: 'Main Actor'},
  {id: '6', name: 'Netero', age: 122, profession: 'Guru'},
]

const HOBBY_DATA = [
  {id: '100', title: 'Trolling', description: 'Trolling desc', userId: '1'},
  {id: '101', title: 'Programming', description: 'Programming desc', userId: '1'},
  {id: '102', title: 'Reading', description: 'Reading desc', userId: '2'},
  {id: '103', title: 'Fencing', description: 'Fencing desc', userId: '3'},
  {id: '104', title: 'Hiking', description: 'Hiking desc', userId: '3'},
  {id: '105', title: 'Running', description: 'Running desc', userId: '4'},
  {id: '106', title: 'Swimming', description: 'Swimming desc', userId: '5'},
  {id: '107', title: 'Walking', description: 'Walking desc', userId: '6'},
]

const POST_DATA = [
  {id: '1000', comment: 'Good!', userId: '1'},
  {id: '1002', comment: 'Very Nice', userId: '4'},
  {id: '1003', comment: 'Exactly what will be doing', userId: '6'},
  {id: '1004', comment: 'what is this?', userId: '4'},
]

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Doc for user...',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    profession: {type: GraphQLString},
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(POST_DATA, {userId: parent.id})
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(HOBBY_DATA, {userId: parent.id})
      }
    }
  })
})

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby for doc...',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(USER_DATA, {id: parent.userId})
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post desc...',
  fields: () => ({
    id: {type: GraphQLID},
    comment: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(USER_DATA, {id: parent.userId})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Doc for Root....',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(USER_DATA, {id: args.id})
      }
    },
    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(HOBBY_DATA, {id: args.id})
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parentm , args) {
        return _.find(POST_DATA, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
