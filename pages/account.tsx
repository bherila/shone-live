import { useState, useEffect } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'

export const Account = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  let showData = {
    firstName: 'enter First name',
    lastName: 'enter last name',
    email: 'enter email',
  }

  useEffect(() => {
    fetch('/api/account', {
      method: 'GET',
    })
      .then((data) => {
        return data.json()
      })
      .then((d) => {
        if (d.id) {
          setIsLoggedIn(true)
          setUser(d)
        } else {
          setIsLoggedIn(false)
          setUser(undefined)
        }
      })
  }, [])

  if (user != undefined) {
    showData.firstName = user.firstName
    showData.lastName = user.lastName
    showData.email = user.email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      firstName,
      lastName,
    }

    try {
      const response = await fetch('/api/account', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()
      console.info(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      {isLoggedIn && (
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
                placeholder={showData.firstName}
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
                placeholder={showData.lastName}
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
                placeholder={showData.email}
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
                placeholder="change password"
              />
            </div>
            <input type="submit" className="btn btn-primary btn-block" />
          </form>
        </>
      )}
    </div>
  )
}

export default Account
