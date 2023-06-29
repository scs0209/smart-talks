import Nav from './Nav'

const Layout = ({ children }: any) => {
  return (
    <div className="dark:bg-gray-900">
      <Nav />
      <div>{children}</div>
    </div>
  )
}

export default Layout
