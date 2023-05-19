import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../services/dbConnect'
import Answer, { IAnswer } from '../../models/Answer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const newAnswer: IAnswer = new Answer({
        answerText: '42.',
        question: 'question-id-here',
        createdBy: 'user-id-here',
      })
      await newAnswer.save()

      res.status(200).json({
        success: true,
        answer: newAnswer,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
