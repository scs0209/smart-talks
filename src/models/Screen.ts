import mongoose, { Document, model, Schema } from 'mongoose'

export interface IScreen extends Document {
  screen_name: string
  seat_info: number[]
}

const ScreenSchema: Schema = new Schema<IScreen>({
  screen_name: { type: String, required: true },
})

const Screen: mongoose.Model<IScreen> =
  mongoose.models.Screen || model<IScreen>('Screen', ScreenSchema)

export default Screen
