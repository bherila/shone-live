import Navbar from '../Navbar/Navbar'

const Layout = ({ children }): JSX.Element => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
