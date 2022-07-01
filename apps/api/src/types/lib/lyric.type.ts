import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { SongType } from '@api/types';
import { LyricModel } from '@api/models';

export const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve: async (parentValue) => {
        const { song } = await LyricModel.findById(parentValue).populate(
          'song'
        );

        return song;
      },
    },
  }),
});

export default LyricType;
