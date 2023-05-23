/* eslint-disable */
import mongoose, { ConnectOptions } from 'mongoose'

const DB_URI = process.env.MONGODB_URI || ''

// MongoDB 연결 설정
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`, options as ConnectOptions)
      .then((mongoose) => {
        console.log('MongoDB 연결 성공')
        return mongoose
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
