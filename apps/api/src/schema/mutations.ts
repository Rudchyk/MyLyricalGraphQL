import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { SongType, LyricType } from '@api/types';
import { LyricModel, SongModel } from '@api/models';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve: (_, { title }) => SongModel.create({ title }),
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve: (_, { content, songId }) => SongModel.addLyric(songId, content),
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => LyricModel.like(id),
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => SongModel.remove({ _id: id }),
    },
  },
});

export default mutation;
