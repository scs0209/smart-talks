import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: any) => {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
