import { useState } from 'react'

import Layout from '../components/Layout/Layout'

export const Account = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      firstName,
      lastName,
      currentPassword,
      newPassword,
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/account', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.status === 'error') {
        setIsLoading(false)
        setSuccess(false)
        setMessage(data.message)
      } else if (data.status === 'success') {
        setIsLoading(false)
        setSuccess(true)
        setMessage('Your account info updated successfully!')
      }
    } catch (err) {
      setIsLoading(false)
      setSuccess(false)
      setMessage('Something went wrong!')
    }
  }

  return (
    <>
      <Layout>
        <div className="container">
          {
            <>
              <form onSubmit={handleSubmit} className="w-75 m-auto">
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    className="form-control"
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    type="text"
                    value={firstName}
                    placeholder="change first name"
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
                    placeholder="change last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    placeholder="change email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newpassword">New Password</label>
                  <input
                    id="newpassword"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.currentTarget.value)}
                    type="password"
                    placeholder="new password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentpassword">Current Password</label>
                  <input
                    id="currentpassword"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                    type="password"
                    placeholder="current password"
                  />
                </div>
                <div className="container row">
                  <input
                    type="submit"
                    className="btn b-inline-block w-25 col-4 btn-primary"
                  />
                  <br />
                  {isLoading && (
                    <div
                      className="spinner-border text-primary ml-5"
                      role="status"
                    >
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
            </>
          }
        </div>
      </Layout>
    </>
  )
}

export default Account
