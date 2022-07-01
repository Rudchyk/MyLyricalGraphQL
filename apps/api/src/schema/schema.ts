import { GraphQLSchema } from 'graphql';
import { RootQuery } from '@api/types';
import mutations from './mutations';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});

export default schema;
