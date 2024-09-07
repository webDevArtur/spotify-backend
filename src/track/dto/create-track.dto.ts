import {ObjectId} from 'mongoose'

export class CreateTrackDto {
    name: string
    artist: string
    text: string
    listens: number
    picture: string
    audio: string
    albumId: ObjectId
}