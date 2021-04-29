import { NextRouter } from 'next/router'
import React from 'react'

import StoreLayout from './StoreLayout'

export default function Layout({ router }: { router: NextRouter }) {
  if (router.pathname.startsWith('/seller')) {
    return <StoreLayout />
  }
  return <></>
}
