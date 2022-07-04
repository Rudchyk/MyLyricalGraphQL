import { GraphQLID } from 'graphql';
import { LyricType } from '@api/types';
import { LyricModel } from '@api/models';

export const lyricMutations = {
  likeLyric: {
    type: LyricType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => LyricModel.like(id),
  },
};

export default lyricMutations;
