import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import SongType from './song_type';
import LyricType from './lyric_type';
import LyricModel from '../models/Lyric.model';
import SongModel from '../models/Song.model';

const RootQuery = new GraphQLObjectType({
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
  }),
});

export default RootQuery;
