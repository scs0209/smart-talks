import mongoose, { Document, Model, Schema } from 'mongoose'
import User, { IUser } from './User'

export interface IReview extends Document {
  movieId: string
  review: string
  userId: IUser['_id']
  createdAt: Date
  likes: Array<IUser['_id']>
  dislikes: Array<IUser['_id']>
  rating: number // 평점 추가
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
})

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
