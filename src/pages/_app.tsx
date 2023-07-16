import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline } from '@mui/material'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@mui/styles'
import theme from '@/styles/theme'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { Flowbite } from 'flowbite-react'
import { AdminPageProvider } from '@/contexts/AdminContext'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  console.log(store)
  return (
    <Provider store={store}>
      <SessionProvider session={props.pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Flowbite>
            <AdminPageProvider>
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </AdminPageProvider>
          </Flowbite>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}
