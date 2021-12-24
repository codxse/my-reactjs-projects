const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL.graphqlHTTP({
    graphiql: true,

}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

