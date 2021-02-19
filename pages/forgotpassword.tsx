import { useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'

export const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = {
      email,
    }

    const response = await fetch('http://localhost:3000/api/forgotpassword', {
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
        <input type="submit" />
      </form>
    </div>
  )
}

export default ForgotPassword
