/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../services/dbConnect'
import Answer, { IAnswer } from '../../models/Answer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const { answerText, question, createdBy } = req.body

      const answer: IAnswer = new Answer({
        answerText,
        question,
        createdBy,
      })
      await answer.save()

      res.status(200).json({
        success: true,
        answer,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
