import Head from 'next/head'
import React from 'react'
import { useState } from 'react'

import AnimatedLogo from '../components/animated-logo'

export default function Index(): JSX.Element {
  const [email, setEmail] = useState('')
  return (
    <>
      <Head>
        <title>Shone Live!</title>
      </Head>
      <div className="container mx-auto">
        <div className="mx-auto w-1/2">
          <AnimatedLogo />
        </div>
        <div className="mx-auto w-1/2">
          <form className="text-center">
            <h1>Be the first to know</h1>
            <input
              autoFocus={true}
              placeholder="email"
              className="px-2 rounded border-gray-50"
              type="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <button type={'submit'}>Join the waitlist</button>
          </form>
        </div>
      </div>
    </>
  )
}
