import mongoose, { Document, model, Schema } from 'mongoose'

export interface ITheater extends Document {
  name: string
  address: string
}

const TheaterSchema: Schema = new Schema<ITheater>({
  name: { type: String, required: true },
  address: { type: String, required: true },
})

const Theater: mongoose.Model<ITheater> =
  mongoose.models.Theater || model<ITheater>('Theater', TheaterSchema)

export default Theater
