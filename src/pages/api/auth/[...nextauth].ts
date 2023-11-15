import bcrypt, { compare } from 'bcrypt'
import { NextApiHandler } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import User, { IUser } from '@/models/User'
import connectDB from '@/services/dbConnect'

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
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

          return { ...user.toJSON() } // session에 이메일이 들어감
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
  jwt: {
    secret: process.env.JWT_SECRET,
    // JWT 만료 시간을 설정하세요 (예: 24시간)
    // 24 * 60 * 60 = 86400 (24시간)
    maxAge: 24 * 60 * 60, // 24 hours (in seconds)
  },
  session: {
    strategy: 'jwt',
    maxAge: 48 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
  // 옵션을 추가하거나 수정하세요
  // 세션 관리, 콜백 등을 설정할 수 있습니다
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions)
export default authHandler
