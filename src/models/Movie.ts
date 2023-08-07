import mongoose, { Document, model, Schema } from 'mongoose'

// Movie Model
export interface IMovie extends Document {
  id: number
  title: string
  genres: Array<{ id: number; name: string }>
  popularity: string
  director: string
  country: string
  releaseDate: Date
  runtime: number
  rating: string
  poster: string
  synopsis: string
  cast: string[]
  status: string
}

const MovieSchema: Schema = new Schema<IMovie>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  popularity: { type: String, required: true },
  director: { type: String, required: true },
  country: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  runtime: { type: Number, required: true },
  rating: { type: String, required: true },
  poster: { type: String, required: true },
  synopsis: { type: String, required: true },
  cast: { type: [String], required: true },
  status: { type: String, required: true },
})

const Movie: mongoose.Model<IMovie> =
  mongoose.models.Movie || model<IMovie>('Movie', MovieSchema)

export default Movie
