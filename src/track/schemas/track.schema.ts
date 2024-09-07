import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Album } from '../../album/schemas/album.schema';
import { Comment } from '../../track/schemas/comment.schema';
import * as mongoose from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
  album: Album;
}

export const TrackSchema = SchemaFactory.createForClass(Track);