import mongoose, { Document, model, Schema } from 'mongoose'
import User from './User'

export interface IUserFavorite extends Document {
  userId: Schema.Types.ObjectId
  movieId: string
}

const UserFavoritesSchema: Schema = new Schema<IUserFavorite>({
  userId: { type: Schema.Types.ObjectId, ref: User, required: true },
  movieId: { type: String, required: true },
})

const UserFavorite: mongoose.Model<IUserFavorite> =
  mongoose.models.UserFavorite ||
  model<IUserFavorite>('UserFavorite', UserFavoritesSchema)

export default UserFavorite
