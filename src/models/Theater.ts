import mongoose, { Document, model, Schema } from 'mongoose'

interface ITheaterBranch {
  _id: mongoose.Types.ObjectId
  address: string
  screens: string[]
}

const TheaterBranchSchema: Schema = new Schema<ITheaterBranch>({
  address: { type: String, required: true },
  screens: {
    type: [String],
    required: true,
  },
})

export interface ITheater extends Document {
  name: string
  branches: ITheaterBranch[]
}

const TheaterSchema: Schema = new Schema<ITheater>({
  name: { type: String, required: true },
  branches: {
    type: [TheaterBranchSchema],
    required: true,
  },
})

const Theater: mongoose.Model<ITheater> =
  mongoose.models.Theater || model<ITheater>('Theater', TheaterSchema)

export default Theater
