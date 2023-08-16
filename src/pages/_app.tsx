import '@/styles/globals.css'

import { Flowbite } from 'flowbite-react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import Layout from '@/components/Layout'
import { wrapper } from '@/redux/store'
import ProtectedLayout from '@/components/ProtecetedLayout'

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean
    allowRole?: '' | 'admin'
  }
}

function App({ Component, pageProps }: AppPropsWithAuth) {
  return (
    <SessionProvider session={...pageProps.session}>
      <Flowbite>
        {Component.requireAuth ? (
          <ProtectedLayout allowRole={Component.allowRole}>
            <Component {...pageProps} />
          </ProtectedLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Flowbite>
    </SessionProvider>
  )
}
export default wrapper.withRedux(App)
