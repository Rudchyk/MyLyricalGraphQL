import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import SongType from './song_type';
import LyricType from './lyric_type';
import LyricModel from '../models/Lyric.model';
import SongModel from '../models/Song.model';

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
      // resolve(parentValue, { id }) {
      //   return LyricModel.like(id);
      // },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      // resolve(parentValue, { id }) {
      //   return SongModel.remove({ _id: id });
      // },
    },
  },
});

export default mutation;
