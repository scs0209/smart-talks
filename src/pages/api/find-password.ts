/* eslint-disable */
import User, { IUser } from '@/models/User'
import connectDB from '@/services/dbConnect'
import sendTempPasswordEmail from '@/services/mailer'
import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, receiveEmail } = req.body
    await connectDB()

    const user: IUser | null = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ error: '존재하지 않는 사용자입니다.' })
    }

    // 임시 비밀번호 생성
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await hash(tempPassword, 12)

    // 비밀번호 업데이트
    user.password = hashedPassword
    await user.save()

    // 이메일 발송
    await sendTempPasswordEmail(receiveEmail, tempPassword)

    return res.status(200).json({ message: '임시 비밀번호가 발급되었습니다.' })
  } else {
    res.status(405).json({ error: '허용되지 않는 요청 방법입니다.' })
  }
}
