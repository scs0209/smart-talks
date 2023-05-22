import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../services/dbConnect'
import Question, { IQuestion } from '../../models/Question'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const { questionText, createdBy } = req.body

      const question: IQuestion = new Question({
        questionText,
        createdBy,
      })
      await question.save()

      res.status(200).json({
        success: true,
        question,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
