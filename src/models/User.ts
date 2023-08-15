import mongoose, { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String },
})

const User: mongoose.Model<IUser> =
  mongoose.models.User || model<IUser>('User', UserSchema)

export default User
