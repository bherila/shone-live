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
    <div className="container">
      <form onSubmit={handleSubmit} className="w-75 m-auto">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
        <input type="submit" className="btn btn-block btn-primary" />
        <Link href="/forgotpassword">
          <a>forgot password</a>
        </Link>
      </form>
    </div>
  )
}

export default Signin
