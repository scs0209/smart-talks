import mongoose, { Schema, Document, model } from 'mongoose'

// Movie Model
export interface IMovie extends Document {
  title: string
  genre: string
  director: string
  country: string
  releaseDate: Date
  runtime: number
  rating: string
  poster: string
  synopsis: string
  cast: string[]
}

const MovieSchema: Schema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  country: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  runtime: { type: Number, required: true },
  rating: { type: String, required: true },
  poster: { type: String, required: true },
  synopsis: { type: String, required: true },
  cast: { type: [String], required: true },
})

const Movie: mongoose.Model<IMovie> =
  mongoose.models.Movie || model<IMovie>('Movie', MovieSchema)

export default Movie
