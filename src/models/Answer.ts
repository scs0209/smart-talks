import mongoose, { Schema, Document, model } from 'mongoose'

export interface IAnswer extends Document {
  answerText: string
  question: string
  createdBy: string
}

const AnswerSchema: Schema = new Schema({
  answerText: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Answer: mongoose.Model<IAnswer> =
  mongoose.models.Answer || model<IAnswer>('Answer', AnswerSchema)

export default Answer
