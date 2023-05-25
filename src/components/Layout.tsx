import Footer from './Footer'
import Nav from './Nav'

const Layout = ({ children }: any) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
