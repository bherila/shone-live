import React from 'react'
import SellerLayout from '../../components/SellerLayout'
import { GetServerSideProps } from 'next'

interface Props {
  isLoggedIn: boolean
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // TODO: Implement thing that determines if the user is logged in, i.e. based on JWT.
  return {
    props: {
      isLoggedIn: false,
    },
  }
}

export default ({ isLoggedIn }: Props) => {
  if (!isLoggedIn) {
    return (
      <SellerLayout>
        <h1>Sell on Shone</h1>
        <p>Information about selling</p>
        <p>Link to sign up or sign in</p>
      </SellerLayout>
    )
  }
}
