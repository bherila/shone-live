import { useState } from 'react'
import Link from 'next/link'
// import Head from 'next/head'
// import Image from 'next/image'

export const Signin = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      password,
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.status === 'success') {
        setIsLoading(false)
        setSuccess(true)
        setMessage(
          `Hi, ${data.user.firstName} ${data.user.lastName} you are logged in!`
        )
      } else {
        setIsLoading(false)
        setSuccess(false)
        setMessage(data.message)
      }
    } catch (err) {
      setIsLoading(false)
      setSuccess(false)
      setMessage('Something went wrong!')
    }
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
            onChange={(e) => setEmail(e.currentTarget.value)}
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
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            placeholder="password"
          />
        </div>
        <div className="container row">
          <input
            type="submit"
            className="btn b-inline-block w-25 col-4 btn-primary"
          />
          <br />
          {isLoading && (
            <div className="spinner-border text-primary ml-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        {message === '' ? null : (
          <>
            <br />
            <div
              className={`${
                success ? 'alert alert-success' : 'alert alert-danger'
              }`}
              role="alert"
            >
              {message}
            </div>
          </>
        )}

        <br />
        <Link href="/forgotpassword">
          <a>forgot password</a>
        </Link>
      </form>
    </div>
  )
}

export default Signin
