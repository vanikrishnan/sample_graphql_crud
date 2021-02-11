const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = '3000';
const app = express();
const schema = require('./schema');
app.use(cors(), bodyParser.json());


// const { graphiqlExpress } = require('apollo-server-express');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

