import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'

const Layout = ({ children }): JSX.Element => {
  useEffect(() => {}, [])

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
