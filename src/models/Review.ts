import mongoose, { Document, Model, Schema } from 'mongoose'
import User, { IUser } from './User'

export interface IReview extends Document {
  movieId: string
  review: string
  userId: IUser['_id']
  createdAt: Date
  likes: Array<IUser['_id']> // 좋아요 누른 사용자의 ID 목록
  dislikes: Array<IUser['_id']> // 싫어요 누른 사용자의 ID 목록
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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: [],
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: [],
    },
  ],
})

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
