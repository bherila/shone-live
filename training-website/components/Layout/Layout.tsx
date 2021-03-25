import Navbar from '../Navbar/Navbar'

interface LayoutProps {
  children: any
  isLoggedIn: boolean
}

const Layout = ({ children, isLoggedIn }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
    </>
  )
}

export default Layout
