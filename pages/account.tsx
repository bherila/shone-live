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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          value={firstName}
          placeholder="change first name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="change last name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="change email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="change password"
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Account
