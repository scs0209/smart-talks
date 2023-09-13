import Footer from './Footer'
import Nav from './Nav'

const Layout = ({ children }: any) => {
  return (
    <div className="dark:bg-gray-900">
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
