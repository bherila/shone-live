import Link from 'next/link'

const Navbar = (): JSX.Element => {
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
        <li>
          <Link href="/api/logout">
            <a className="nav-link">Logout</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
