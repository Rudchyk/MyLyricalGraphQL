import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import schema from './schema/schema';

const app = express();
const port = process.env.PORT || 3333;

// console.log('process.env', process.env);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// console.log('process.env.port', process.env.NODE_ENV);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

mongoose.connect(process.env.NX_MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', (error) => console.log('Error connecting to Mongo:', error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.NX_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.NX_MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/api/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/api', (req, res) => {
  const greeting = { message: 'Welcome to api!' };

  res.send(greeting);
});

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
