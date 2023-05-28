/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import connectDB from '../../services/dbConnect'
import User, { IUser } from '../../models/User'
import { authOptions } from './auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const { username, email, password, firstName, lastName } = req.body

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser: IUser = new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      await newUser.save()

      res.status(200).json({
        success: true,
        user: newUser,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  } else if (req.method === 'GET') {
    try {
      const { email } = req.query

      // 이메일을 사용하여 사용자 정보를 조회
      const user = await User.findOne({ email })

      if (!user) {
        // 사용자를 찾을 수 없는 경우 에러 응답
        return res
          .status(404)
          .json({ success: false, message: 'User not found' })
      }

      res.status(200).json({
        success: true,
        user,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(500).json({ success: false, message })
    }
  } else {
    await NextAuth(req, res, authOptions)
  }
}
