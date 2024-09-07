import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Track, TrackDocument } from './schemas/track.schema'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { CreateTrackDto } from './dto/create-track.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileService, FileTypes } from 'src/file/file.service'
import { Album, AlbumDocument } from 'src/album/schemas/album.schema'

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileServise: FileService
    ) {}

    async createTrack(createTrackDto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileServise.createFile(FileTypes.AUDIO, audio);
        const picturePath = this.fileServise.createFile(FileTypes.IMAGE, picture);

        const album = await this.albumModel.findById(createTrackDto.albumId)
        const newTrack = await this.trackModel.create({...createTrackDto, listens: 0, audio: audioPath, picture: picturePath})

        album.tracks.push(newTrack.id)

        await album.save()

        return newTrack;
    }

    async getTracks(count = 10, offset = 0): Promise<Track[]> {
        return await this.trackModel.find().skip(Number(offset)).limit(Number(count)).populate('comments');
    }

    async searchTrack(query: string): Promise<Track[]> {
        return await this.trackModel.find({
            name: new RegExp(query, 'i'),
        })
    }

    async getTrack(id: ObjectId): Promise<Track> {
        return await this.trackModel.findById(id).populate('comments')
    }

    async deleteTrack(id: ObjectId): Promise<ObjectId> {
        await this.commentModel.deleteMany({ track: id });

        const track = await this.trackModel.findByIdAndDelete(id)
        
        return track.id
    }

    async listenTrack(id: ObjectId): Promise<void> {
        const track = await this.trackModel.findById(id)

        track.listens += 1;

        await track.save();
    }

    async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(createCommentDto.trackId)
        const newComment = await this.commentModel.create({...createCommentDto})

        track.comments.push(newComment.id)

        await track.save()

        return newComment
    }

    async deleteComment(id: ObjectId): Promise<ObjectId> {
        const comment = await this.commentModel.findByIdAndDelete(id)

        return comment.id
    }
}