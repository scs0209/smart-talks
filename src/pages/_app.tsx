import connectDB from '@/services/dbConnect'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

connectDB()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
