import { useState } from 'react'
import Link from 'next/link'
// import Head from 'next/head'
// import Image from 'next/image'

export const Signin = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      password,
    }

    const response = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      body: JSON.stringify(submitData),
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <input type="submit" />
      </form>

      <Link href="/forgotpassword">
        <a>forgot password</a>
      </Link>
    </div>
  )
}

export default Signin
