import Link from 'next/link'

import { useRouter } from 'next/router'

const Navbar = (): JSX.Element => {
  const logout = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/logout')
    } catch (error) {
      console.info('Can not logout')
    }
  }

  return (
    <div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link href="/signin">
            <a className="nav-link active">Sign in</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a className="nav-link">Sign up</a>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <a className="nav-link">Account</a>
          </Link>
        </li>
        <li onClick={logout}>
          <Link href="/">
            <a className="nav-link">Logout</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
