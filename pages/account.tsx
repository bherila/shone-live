import { useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'

export const Account = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
      firstName,
      lastName,
      password,
    }

    const response = await fetch('http://localhost:3000/api/account', {
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
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="change email"
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
            placeholder="change password"
          />
        </div>
        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Account
