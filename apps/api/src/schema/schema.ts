import { GraphQLSchema } from 'graphql';
import RootQuery from './root_query_type';
import mutations from './mutations';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
