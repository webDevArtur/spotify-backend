import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {TrackController} from './track.controller'
import { TrackService } from './track.service'
import { Track, TrackSchema} from './schemas/track.schema'
import {Comment, CommentSchema} from './schemas/comment.schema'
import {FileService} from '../file/file.service'
import { Album, AlbumSchema } from 'src/album/schemas/album.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService],
})

export class TrackModule {}