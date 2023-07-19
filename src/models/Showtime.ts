import mongoose, { Document, model, Schema } from 'mongoose'

import { IMovie } from './Movie'
import { ITheater } from './Theater'

export interface IShowtime extends Document {
  movie: IMovie
  showtimes: [
    {
      theater: ITheater['_id']
      screen_name: string
      start_time: Date
      end_time: Date
    },
  ]
}

const ShowtimeSchema: Schema = new Schema<IShowtime>({
  movie: {
    type: Object,
    required: true,
  },
  showtimes: [
    {
      theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true,
      },
      branch_address: { type: String, required: true },
      screen_name: { type: String, required: true },
      start_time: { type: Date, required: true },
      end_time: { type: Date, required: true },
    },
  ],
})

const Showtime: mongoose.Model<IShowtime> =
  mongoose.models.Showtime || model<IShowtime>('Showtime', ShowtimeSchema)

export default Showtime
