import mongoose, { Document, model, Schema } from 'mongoose'

import Movie, { IMovie } from './Movie'
import Theater, { ITheater } from './Theater'
import Screen, { IScreen } from './Screen'

export interface IShowtime extends Document {
  movie: IMovie
  theater: ITheater
  screen: IScreen
  startTime: Date
  endTime: Date
}

const ShowtimeSchema: Schema = new Schema<IShowtime>({
  movie: { type: mongoose.Types.ObjectId, ref: Movie, required: true },
  theater: { type: mongoose.Types.ObjectId, ref: Theater, required: true },
  screen: { type: mongoose.Types.ObjectId, ref: Screen, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
})

const Showtime: mongoose.Model<IShowtime> =
  mongoose.models.Showtime || model<IShowtime>('Showtime', ShowtimeSchema)

export default Showtime
