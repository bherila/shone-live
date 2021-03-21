import Head from 'next/head'
import React from 'react'
import Cookies from 'universal-cookie'

import { BasePageProps } from '../BasePageProps'
import consts from '../components/consts'
import Login from '../components/login'

export default function LoginPage({
  hasReadPermission,
}: BasePageProps): React.ReactElement {
  if (hasReadPermission) {
    return (
      <>
        <Head>
          <title>Logout</title>
        </Head>
        <div className="w-1/3 max-w-sm mx-auto">
          <button
            className="mt-3 bg-green-400 text-white p-2 font-bold rounded hover:bg-green-600"
            onClick={(e) => {
              e.preventDefault()
              const cookies = new Cookies()
              cookies.remove(consts.SiteReadCookie, { path: '/' })
              window.location.href = '/login'
            }}
          >
            Logout
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login redirectPath="/" />
    </>
  )
}
