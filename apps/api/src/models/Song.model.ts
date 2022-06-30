import { Document, Schema, model, Model } from 'mongoose';
import LyricModel from './Lyric.model';

interface SongSchemaInterface extends Document {
  title: string;
  user: Schema.Types.ObjectId;
  lyrics: Schema.Types.ObjectId[];
}

interface SongModelInterface extends Model<SongSchemaInterface> {
  findLyrics(id: string): Schema.Types.ObjectId[];
  addLyric(id: string, content: string): SongSchemaInterface;
}

const SongSchema = new Schema<SongSchemaInterface, SongModelInterface>({
  title: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lyric',
    },
  ],
});

SongSchema.static('addLyric', async function (id, content) {
  const song = await this.findById(id);
  const lyric = await LyricModel.create({ content, song });

  song.lyrics.push(lyric._id);

  return await song.save();
});

SongSchema.static('findLyrics', async function (id) {
  const { lyrics } = await this.findById(id).populate('lyrics');

  return lyrics;
});

export const SongModel = model<SongSchemaInterface, SongModelInterface>(
  'Song',
  SongSchema
);

export default SongModel;
