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

    try {
      const response = await fetch('/api/forgotpassword', {
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
        <input type="submit" className="btn btn-block btn-primary" />
      </form>
    </div>
  )
}

export default ForgotPassword
