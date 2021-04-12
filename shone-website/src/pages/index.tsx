import cn from 'classnames'
import Head from 'next/head'
import React from 'react'
import { useState } from 'react'

import AnimatedLogo from '../components/animated-logo'
import rainbow from '../components/RainbowGradientContainer.module.css'
import { useSubscribeToWaitlistMutation } from '../generated/graphql'

export default function Index(): JSX.Element {
  const [email, setEmail] = useState('')
  const [createConsumerLead] = useSubscribeToWaitlistMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createConsumerLead({
        variables: { email },
      })
    } catch (error) {}
  }

  return (
    <>
      <Head>
        <title>Shone Live!</title>
      </Head>
      <div
        className={cn(
          rainbow.gradient,
          'h-screen w-screen flex flex-row justify-center sm:px-3',
        )}
      >
        <div className="container object-center flex flex-col shadow-xl bg-white flex-no-grow self-center py-8 px-12 max-w-screen-sm">
          <div className="mx-auto">
            <AnimatedLogo />
          </div>
          <div className="">
            <form className="text-center flex flex-col w-full">
              <h1 className="text-4xl uppercase py-4">Be the first to know</h1>
              <p className="py-4">
                We’ll send you the link to download SHONE when it’s your turn.
              </p>
              <input
                autoFocus={true}
                placeholder="email"
                className="px-4 py-2 my-4 rounded-full border-gray-50 w-1/2 mx-auto"
                style={{
                  background: '#E9E9E9',
                }}
                type="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
              />
              <button
                type={'submit'}
                onClick={handleSubmit}
                className="rounded-full bg-orange-400 uppercase py-2 px-4 text-white mx-auto flex-grow-0"
                style={{ background: '#FCB344' }}
              >
                Join the waitlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
