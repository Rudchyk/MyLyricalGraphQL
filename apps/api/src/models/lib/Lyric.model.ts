import { Schema, model, Model } from 'mongoose';
import { Lyric } from '@api-interfaces';

type LyricSchemaInterface = Lyric;

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
  const lyric = await this.findById(id);

  ++lyric.likes;

  return await lyric.save();
});

export const LyricModel = model<LyricSchemaInterface, LyricModelInterface>(
  'Lyric',
  LyricSchema
);

export default LyricModel;
