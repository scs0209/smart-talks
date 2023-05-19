import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CssBaseline />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
