import cn from 'classnames'
import Head from 'next/head'
import React, { useState } from 'react'

import AnimatedLogo from '../components/animated-logo'
import rainbow from '../components/RainbowGradientContainer.module.css'
import { useSubscribeToWaitlistMutation } from '../generated/graphql'
import isValidEmail from '../helpers/isValidEmail'
import useInput from '../hooks/useInput'
import Image from 'next/image';

export default function Index(): JSX.Element {
  const [submitted, setSubmitted] = useState(false)
  const { value: email, setValue: setEmail, valid } = useInput({
    defaultValue: '',
    validate: isValidEmail,
  })
  const [
    createConsumerLead,
    { loading, data },
  ] = useSubscribeToWaitlistMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (!valid || loading) return
    try {
      await createConsumerLead({
        variables: { email },
      })
    } catch (error) {
      console.log(error)
    }
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
            {!data ? (
              <form className="text-center flex flex-col w-full">
                <h1 className="text-4xl uppercase py-4">
                  Be the first to know
                </h1>
                <p className="py-4">
                  We’ll send you the link to download SHONE when it’s your turn.
                </p>
                <div className="my-4">
                  <input
                    autoFocus={true}
                    placeholder="email"
                    className="px-4 py-2 rounded-full border-gray-50 w-1/2 mx-auto"
                    style={{
                      background: '#E9E9E9',
                    }}
                    type="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                  />
                  {submitted && !valid && (
                    <div className="text-xs font-light text-red-500">
                      Invalid email
                    </div>
                  )}
                </div>
                <button
                  disabled={loading}
                  type={'submit'}
                  onClick={handleSubmit}
                  className="rounded-full bg-orange-400 uppercase py-2 px-4 text-white mx-auto flex-grow-0"
                  style={{ background: '#FCB344' }}
                >
                  Join the waitlist
                </button>
              </form>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl w-8/12 text-center">
                    THANK YOU FOR SENDING YOUR EMAIL!
                  </div>
                  <Image src="/tick.svg" className="mt-4 w-1/12" width={100} height={100} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
