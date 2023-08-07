import mongoose, { Document, model, Schema } from 'mongoose'
import Theater, { ITheater } from './Theater'

export interface IScreen extends Document {
  screenName: string
  theater: ITheater
  address: string
}

const ScreenSchema: Schema = new Schema<IScreen>({
  screenName: { type: String, required: true },
  theater: { type: mongoose.Types.ObjectId, ref: Theater, required: true },
  address: { type: String, required: true },
})

const Screen: mongoose.Model<IScreen> =
  mongoose.models.Screen || model<IScreen>('Screen', ScreenSchema)

export default Screen
