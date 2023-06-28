import mongoose, { Schema, Document, model } from 'mongoose'

export interface ISeat extends Document {
  row: string
  seat_number: number
}

export const SeatSchema: Schema = new Schema<ISeat>({
  row: { type: String, required: true },
  seat_number: { type: Number, required: true },
})

export interface IScreen extends Document {
  screen_name: string
  seat_info: ISeat[]
}

const ScreenSchema: Schema = new Schema<IScreen>({
  screen_name: { type: String, required: true },
  seat_info: { type: [SeatSchema], required: true },
})

export interface ITheater extends Document {
  name: string
  address: string
  screens: IScreen[]
}

const TheaterSchema: Schema = new Schema<ITheater>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  screens: { type: [ScreenSchema], required: true },
})

const Theater: mongoose.Model<ITheater> =
  mongoose.models.Theater || model<ITheater>('Theater', TheaterSchema)

export default Theater
