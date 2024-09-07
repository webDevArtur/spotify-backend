import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Track } from '../../track/schemas/track.schema';
import * as mongoose from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);