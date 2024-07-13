import { ObjectId } from "mongoose";
export declare class CreateCommentDto {
    username: string;
    text: string;
    trackId: ObjectId;
}
