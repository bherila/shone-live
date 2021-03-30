import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CheckLogin from '../lib/CheckLogin'
import { GetServerSideProps } from 'next'

interface AccountType {
  isUserLoggedIn: boolean
}

export const ForgotPassword = ({
  isUserLoggedIn,
}: AccountType): JSX.Element => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/forgotpassword', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.status === 'success') {
        setIsLoading(false)
        setSuccess(true)
        setMessage(data.message)
      } else {
        setIsLoading(false)
        setSuccess(false)
        setMessage(data.message)
      }
    } catch (error) {
      setIsLoading(false)
      setSuccess(true)
      setMessage('Something went wrong! please try again later')
    }
  }

  return (
    <Layout isLoggedIn={isUserLoggedIn}>
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

export default ForgotPassword

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userInfo = CheckLogin(ctx)

  return {
    props: { ...userInfo },
  }
}
