import { GraphQLString, GraphQLID } from 'graphql';
import { SongType } from '@api/types';
import { SongModel } from '@api/models';

export const songMutations = {
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
  deleteSong: {
    type: SongType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => SongModel.deleteOne({ _id: id }),
  },
};

export default songMutations;
