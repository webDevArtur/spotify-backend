import { HydratedDocument } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment {
    username: string;
    text: string;
    comments: Track;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}>;
