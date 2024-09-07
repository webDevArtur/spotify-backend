import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album, AlbumDocument } from "./schemas/album.schema";
import { Track, TrackDocument } from "../track/schemas/track.schema";
import { Comment, CommentDocument } from "../track/schemas/comment.schema";
import { Model } from "mongoose";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { ObjectId } from "mongoose";

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {}

    async findAll(): Promise<Album[]> {
      return this.albumModel.find().populate({
        path: 'tracks',
        populate: {
            path: 'comments',
            model: 'Comment'
        }
    });
    }

    async findOne(id: ObjectId): Promise<Album> {
        return this.albumModel.findById(id).populate({
          path: 'tracks',
          populate: {
              path: 'comments',
              model: 'Comment'
          }
      });
      }
    
      async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const createdAlbum = await this.albumModel.create({
            ...createAlbumDto
        });
        return createdAlbum;
      }
    
      async delete(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id);
        if (!album) {
            throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
        }

        const tracks = await this.trackModel.find({ album: id });
        const trackIds = tracks.map(track => track.id);

        const comments = await this.commentModel.find({ track: { $in: trackIds } });
        const commentIds = comments.map(comment => comment.id);

        await this.commentModel.deleteMany({ id: { $in: commentIds } });

        await this.trackModel.deleteMany({ id: { $in: trackIds } });

        return this.albumModel.findByIdAndDelete(id);
      }
}