import mongoose, { Schema, Document, model } from 'mongoose'
import { IUser } from './User'

export interface IQuestion extends Document {
  questionText: string
  createdBy: IUser['_id']
}

const QuestionSchema: Schema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Question: mongoose.Model<IQuestion> =
  mongoose.models.Question || model<IQuestion>('Question', QuestionSchema)

export default Question
