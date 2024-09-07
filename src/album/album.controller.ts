import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';

@Controller('/albums')
export class AlbumController {

    constructor(private albumService: AlbumService) {}

    @Get()
    findAll() {
      return this.albumService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: ObjectId) {
      return this.albumService.findOne(id);
    }

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
      return this.albumService.create(createAlbumDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
      return this.albumService.delete(id);
    }
  }