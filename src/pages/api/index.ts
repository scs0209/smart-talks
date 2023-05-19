import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'
import Question, { IQuestion } from '../../models/Question'
import Answer, { IAnswer } from '../../models/Answer'
import connectDB from '../../services/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const newUser: IUser = new User({
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        firstName: 'Test',
        lastName: 'User',
      })
      await newUser.save()

      const newQuestion: IQuestion = new Question({
        questionText: 'What is the meaning of life?',
        createdBy: newUser._id,
      })
      await newQuestion.save()

      const newAnswer: IAnswer = new Answer({
        answerText: '42.',
        question: newQuestion._id,
        createdBy: newUser._id,
      })
      await newAnswer.save()

      res.status(200).json({
        success: true,
        user: newUser,
        question: newQuestion,
        answer: newAnswer,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
