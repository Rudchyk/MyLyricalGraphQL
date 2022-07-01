import { Schema, Document } from 'mongoose';

export interface Song extends Document {
  title: string;
  user: Schema.Types.ObjectId;
  lyrics: Schema.Types.ObjectId[];
}
