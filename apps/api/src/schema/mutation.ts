import { GraphQLObjectType } from 'graphql';
import { authMutations, lyricMutations, songMutations } from '@api/mutations';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authMutations,
    ...lyricMutations,
    ...songMutations,
  },
});

export default mutation;
