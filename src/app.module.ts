import {Module} from '@nestjs/common'
import {TrackModule} from './track/track.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static';
import {FileModule} from './file/file.module'
import * as path from 'path'
import { AlbumModule } from './album/album.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@spotify.29iljiq.mongodb.net/?retryWrites=true&w=majority&appName=spotify'),
        TrackModule,
        AlbumModule,
        FileModule
    ],
})

export class AppModule {}