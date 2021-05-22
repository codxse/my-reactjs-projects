const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/sandboxDB`, {
  useNewUrlParser: true
})
mongoose.connection.once('open', () => {
  console.log('MongoDB connected!')
})
const schema = require('./schemas/schema')
const app = express()

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}))

app.listen(4000, () => {
  console.log('Am listening to 4000')
})