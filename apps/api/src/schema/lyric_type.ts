import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import SongType from './song_type';
import LyricModel from '../models/Lyric.model';

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve(parentValue) {
        return LyricModel.findById(parentValue)
          .populate('song')
          .then((lyric: any) => {
            console.log(lyric);
            return lyric.song;
          });
      },
    },
  }),
});

export default LyricType;
