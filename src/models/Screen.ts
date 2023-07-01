import mongoose, { Schema, Document, model } from 'mongoose'

export interface IScreen extends Document {
  screen_name: string
  seat_info: number[]
}

const ScreenSchema: Schema = new Schema<IScreen>({
  screen_name: { type: String, required: true },
  seat_info: {
    type: [Number],
    required: true,
  },
})

const Screen: mongoose.Model<IScreen> =
  mongoose.models.Screen || model<IScreen>('Screen', ScreenSchema)

export default Screen
