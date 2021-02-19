import Link from 'next/link'

const Navbar = (): JSX.Element => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
