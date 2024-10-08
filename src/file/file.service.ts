import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileTypes {
    IMAGE = 'image',
    AUDIO = 'audio'
}

@Injectable()
export class FileService {

    createFile(type: FileTypes, file): string {
        try {
            const fileExtention = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtention
            const filePath = path.resolve(__dirname, '..', 'static', type)
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return type + '/' + fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}