import mongoose, { Document, Model, model, Schema } from 'mongoose'
import User, { IUser } from './User'

export interface IReview extends Document {
  movieId: string
  review: string
  userId: IUser['_id']
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>({
  movieId: String,
  review: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  createdAt: {
    type: Date,
    default: () => new Date(Date.now() + 9 * 60 * 60 * 1000), // 한국 시간으로 설정
  },
})

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
