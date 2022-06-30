import { Document, Schema, model, Model } from 'mongoose';

export interface LyricSchemaInterface extends Document {
  song: Schema.Types.ObjectId;
  likes: number;
  content: string;
  like(id: string): void;
}

type LyricModelInterface = Model<LyricSchemaInterface>;

const LyricSchema = new Schema<LyricSchemaInterface, LyricModelInterface>({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'Song',
  },
  likes: { type: Number, default: 0 },
  content: String,
});

// LyricSchema.statics.like = async (id) => {
//   const Lyric = model('Lyric');
//   const lyric = await Lyric.findById(id);

//   ++lyric.likes;

//   lyric.save();
// };

export const LyricModel = model<LyricSchemaInterface, LyricModelInterface>(
  'Lyric',
  LyricSchema
);

export default LyricModel;
