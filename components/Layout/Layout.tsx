import Navbar from '../Navbar/Navbar'

const Layout = ({ children, isLoggedIn }): JSX.Element => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
    </>
  )
}

export default Layout
