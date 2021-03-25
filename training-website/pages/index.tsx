// import Head from 'next/head'
// import Image from 'next/image'

import CheckLogin from '../lib/CheckLogin'

import Layout from '../components/Layout/Layout'
import { GetServerSideProps } from 'next'

export const Home = ({ isUserLoggedIn }): JSX.Element => {
  return (
    <Layout isLoggedIn={isUserLoggedIn}>
      <h1>Home page</h1>
    </Layout>
  )
}
export default Home

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userInfo = CheckLogin(ctx)

  return {
    props: { ...userInfo },
  }
}
