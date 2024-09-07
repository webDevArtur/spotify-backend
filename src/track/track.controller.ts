import {Controller, Get, Delete, Post, Param, Body, Query, UploadedFiles, UseInterceptors} from '@nestjs/common'
import {TrackService} from './track.service'
import {ObjectId} from 'mongoose'
import { CreateTrackDto } from './dto/create-track.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ]))
    createTrack(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) {
        const {picture, audio} = files
        return this.trackService.createTrack(createTrackDto, picture[0], audio[0])
    }

    @Get()
    getTracks(@Query('count') count: number, @Query('offset') offset: number) {
        return this.trackService.getTracks(count, offset)
    }

    @Get(':id')
    getTrack(@Param('id') id: ObjectId) {
        return this.trackService.getTrack(id)
    }

    @Get('/search')
    searchTrack(@Param('query') query: string) {
        return this.trackService.searchTrack(query)
    }

    @Delete(':id')
    deleteTrack(@Param('id') id: ObjectId) {
        return this.trackService.deleteTrack(id)
    }

    @Post('/comment')
    addComment(@Body() createCommentDto: CreateCommentDto) {
        return this.trackService.addComment(createCommentDto)
    }

    @Delete("/comment")
    deleteComment(@Param('id') id: ObjectId) {
        return this.trackService.deleteComment(id)
    }

    @Post('/listen/:id')
    listenTrack(@Param('id') id: ObjectId) {
        return this.trackService.listenTrack(id)
    }
}