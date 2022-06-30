import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import LyricType from './lyric_type';
import SongModel from '../models/Song.model';

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve: (parentValue) => SongModel.findLyrics(parentValue.id),
    },
  }),
});

export default SongType;
