import { compare, hash } from 'bcrypt'
import connectDB from '@/services/dbConnect'
import User from '@/models/User'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const { currentPassword, newPassword, session } = req.body

  // 현재 비밀번호 일치 여부 확인
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  const isValid = await compare(currentPassword, user.password)
  if (!isValid) {
    return res.status(400).json({ error: 'Current password is incorrect' })
  }

  // 새로운 비밀번호 해싱
  const hashedPassword = await hash(newPassword, 10)

  // 비밀번호 업데이트
  await User.findOneAndUpdate(
    { email: session.user.email },
    {
      password: hashedPassword,
    },
    { new: true },
  )

  return res.status(200).json({ message: 'Password updated successfully' })
}
