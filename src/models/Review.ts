import mongoose, { Document, Model, model, Schema } from 'mongoose'
import User, { IUser } from './User'

export interface IReview extends Document {
  movieId: string
  review: string
  userId: IUser['_id']
}

const ReviewSchema = new Schema<IReview>({
  movieId: String,
  review: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
})

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
