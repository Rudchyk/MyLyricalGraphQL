import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { SongType, LyricType, UserType } from '@api/types';
import { LyricModel, SongModel } from '@api/models';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve: () => SongModel.find({}),
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => SongModel.findById(id),
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => LyricModel.findById(id),
    },
    user: {
      type: UserType,
      resolve: (_, args, req) => req.user,
    },
  }),
});

export default RootQueryType;
