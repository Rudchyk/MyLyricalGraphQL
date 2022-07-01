import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import { LyricType } from '@api/types';
import { SongModel } from '@api/models';

export const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve: ({ id }) => SongModel.findLyrics(id),
    },
  }),
});

export default SongType;
