import mongoose, { ConnectOptions } from 'mongoose'

const DB_URI = process.env.MONGODB_URI || ''

// MongoDB 연결 설정
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log('MongoDB 연결 성공')
  } catch (error) {
    console.error('MongoDB 연결 실패:', error)
  }
}

export default connectDB
