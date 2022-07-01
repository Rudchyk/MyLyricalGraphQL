import { Schema, Document } from 'mongoose';

export interface Lyric extends Document {
  song: Schema.Types.ObjectId;
  likes: number;
  content: string;
}
