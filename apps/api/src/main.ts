import * as express from 'express';
import { Message } from '@my-lyrical-graph-ql/api-interfaces';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema/schema';

const app = express();
const MONGO_URI = 'mongodb://localhost:27017/lyricaldb';

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/api/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/api', (req, res) => {
  const greeting: Message = { message: 'Welcome to api!' };

  res.send(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
