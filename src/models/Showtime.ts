import mongoose, { Schema, Document, model } from 'mongoose'

export interface IShowtime extends Document {
  movie_id: mongoose.Schema.Types.ObjectId
  theater_id: mongoose.Schema.Types.ObjectId
  screen_name: string
  start_time: Date
  end_time: Date
}

const ShowtimeSchema: Schema = new Schema<IShowtime>({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  screen_name: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
})

const Showtime: mongoose.Model<IShowtime> =
  mongoose.models.Showtime || model<IShowtime>('Showtime', ShowtimeSchema)

export default Showtime
