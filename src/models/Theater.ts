import mongoose, { Schema, Document, model } from 'mongoose'
import Screen, { IScreen } from './Screen'

export interface ITheater extends Document {
  name: string
  address: string
  screens: string[]
}

const TheaterSchema: Schema = new Schema<ITheater>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  screens: {
    type: [String],
    required: true,
  },
})

const Theater: mongoose.Model<ITheater> =
  mongoose.models.Theater || model<ITheater>('Theater', TheaterSchema)

export default Theater
