import { useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'

import { useRouter } from 'next/router'

import Layout from '../components/Layout/Layout'
import CheckLogin from '../lib/CheckLogin'

export const Signup = ({ isUserLoggedIn }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()
      if (data.status === 'success') {
        refreshData()
        setIsLoading(false)
        setSuccess(true)
        setMessage(
          `Hi, ${data.user.firstName} ${data.user.lastName} your account has been created succesfully`
        )
      } else {
        refreshData()
        setIsLoading(false)
        setSuccess(false)
        setMessage(data.message)
      }
    } catch (error) {
      refreshData()
      setIsLoading(false)
      setSuccess(false)
      setMessage('Something went wrong, please try again!')
    }
  }

  return (
    <Layout isLoggedIn={isUserLoggedIn}>
      <div className="container">
        <form onSubmit={handleSubmit} className="w-75 m-auto">
          <div className="form-group ">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              className="form-control"
              onChange={(e) => setFirstName(e.currentTarget.value)}
              type="text"
              value={firstName}
              placeholder="first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              type="text"
              placeholder="last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
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
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              id="confirmpassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              type="password"
              placeholder="confirm password"
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
        </form>
      </div>
    </Layout>
  )
}

export default Signup

export function getServerSideProps(ctx) {
  const userInfo = CheckLogin(ctx)

  return {
    props: { ...userInfo },
  }
}
