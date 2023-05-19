import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../services/dbConnect'
import Question, { IQuestion } from '../../models/Question'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const newQuestion: IQuestion = new Question({
        questionText: 'What is the meaning of life?',
        createdBy: 'user-id-here',
      })
      await newQuestion.save()

      res.status(200).json({
        success: true,
        question: newQuestion,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
