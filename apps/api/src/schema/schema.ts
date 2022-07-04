import { GraphQLSchema } from 'graphql';
import { RootQueryType } from '@api/types';
import mutation from './mutation';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});

export default schema;
