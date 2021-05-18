const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()

app.use('/graphql', graphqlHTTP({
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Am listening to 4000')
})