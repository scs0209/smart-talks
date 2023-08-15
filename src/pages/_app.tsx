import '@/styles/globals.css'

import { Flowbite } from 'flowbite-react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

import Layout from '@/components/Layout'
import { wrapper } from '@/redux/store'
import ProtectedLayout from '@/components/ProtecetedLayout'

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean
  }
}

export default function App({ Component, ...rest }: AppPropsWithAuth) {
  const { store, props } = wrapper.useWrappedStore(rest)
  console.log(store)
  return (
    <Provider store={store}>
      <SessionProvider session={props.pageProps.session}>
        <Flowbite>
          {Component.requireAuth ? (
            <ProtectedLayout>
              <Component {...props.pageProps} />
            </ProtectedLayout>
          ) : (
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          )}
        </Flowbite>
      </SessionProvider>
    </Provider>
  )
}
