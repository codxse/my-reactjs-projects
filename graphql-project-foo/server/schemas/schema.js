const graphql = require('graphql')
const _ = require('lodash')
const User = require('../models/user')
const Hobby = require('../models/hobby')
const Post = require('../models/post')

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
        // return _.filter(POST_DATA, {userId: parent.id})
        return Post.find({userId: parent.id}).exec()
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return _.filter(HOBBY_DATA, {userId: parent.id})
        return Hobby.find({userId: parent.id}).exec()
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
        // return _.find(USER_DATA, {id: parent.userId})
        return User.findById(parent.userId)
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
        // return _.find(USER_DATA, {id: parent.userId})
        return User.findById(parent.userId)
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
        // return _.find(USER_DATA, {id: args.id})
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return USER_DATA
        return User.find({})
      }
    },
    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return _.find(HOBBY_DATA, {id: args.id})
        return Hobby.findById(args.id)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return HOBBY_DATA
        return Hobby.find({})
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parent , args) {
        // return _.find(POST_DATA, {id: args.id})
        return Post.findById(args.id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return POST_DATA
        return Post.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        })
        user.save()
        return user
      }
    },
    CreatePost: {
      type: PostType,
      args: {
        userId: {type: GraphQLID},
        comment: {type: GraphQLString},
      },
      resolve(parent, args) {
        let post = new Post({
          userId: args.userId,
          comment: args.comment,
        })
        post.save()
        return post
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        userId: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
      },
      resolve(parent, args) {
        let hobby = new Hobby({
          userId: args.userId,
          title: args.title,
          description: args.description,
        })
        hobby.save()
        return hobby
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
