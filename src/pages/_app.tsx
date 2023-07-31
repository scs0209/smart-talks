import '@/styles/globals.css'

import { Flowbite } from 'flowbite-react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

import Layout from '@/components/Layout'
import { AdminPageProvider } from '@/contexts/AdminContext'
import { wrapper } from '@/redux/store'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  console.log(store)
  return (
    <Provider store={store}>
      <SessionProvider session={props.pageProps.session}>
        <Flowbite>
          <AdminPageProvider>
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </AdminPageProvider>
        </Flowbite>
      </SessionProvider>
    </Provider>
  )
}
