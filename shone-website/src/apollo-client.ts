import { ApolloClient, InMemoryCache } from '@apollo/client'

const createClient = () =>
  new ApolloClient({
    uri: process.env.APOLLO_URI,
    cache: new InMemoryCache(),
  })

export default createClient
