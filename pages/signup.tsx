import { useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'

export const Signup = (): JSX.Element => {
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

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      const data = await response.json()
      console.info(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
          <label htmlFor="lastname">First Name</label>
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
        <input type="submit" className="btn btn-block btn-primary" />
      </form>
    </div>
  )
}

export default Signup
