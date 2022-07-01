import { Document, Schema, model, Model } from 'mongoose';

export interface LyricSchemaInterface extends Document {
  song: Schema.Types.ObjectId;
  likes: number;
  content: string;
  like(id: string): void;
}

interface LyricModelInterface extends Model<LyricSchemaInterface> {
  like(id: string): void;
}

const LyricSchema = new Schema<LyricSchemaInterface, LyricModelInterface>({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'Song',
  },
  likes: { type: Number, default: 0 },
  content: String,
});

LyricSchema.static('like', async function (id) {
  console.log('id', id);

  const lyric = await this.findById(id);

  ++lyric.likes;

  return await lyric.save();
});

export const LyricModel = model<LyricSchemaInterface, LyricModelInterface>(
  'Lyric',
  LyricSchema
);

export default LyricModel;
