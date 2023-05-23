import bcrypt, { compare } from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { sign } from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

import connectDB from '@/services/dbConnect'
import User, { IUser } from '@/models/User'
import { NextApiHandler } from 'next'

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          await connectDB()

          const user: IUser | null = await User.findOne({
            email: credentials.email,
          })

          if (!user) {
            throw new Error('No user found with that email')
          }

          const isValid = await compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error('Invalid password')
          }

          const token = sign({ user }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
          })

          return { ...user.toJSON(), token }
        }

        return null
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt(token: JWT, user?: { [key: string]: any }) {
      let modifiedToken = token
      if (user) {
        modifiedToken = { ...user }
      }
      return modifiedToken
    },
    async session(params) {
      const { session, token } = params
      session.user = token
      return session
    },
  },
  // 옵션을 추가하거나 수정하세요
  // 세션 관리, 콜백 등을 설정할 수 있습니다
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions)
export default authHandler
