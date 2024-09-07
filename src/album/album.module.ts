import { Module } from '@nestjs/common';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { Comment, CommentSchema } from 'src/track/schemas/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
})


export class AlbumModule {}