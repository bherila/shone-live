import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { onError } from 'apollo-link-error'
import { API_STAGING, API_LOCALHOST } from '../utils/environment'

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// const client = new ApolloClient({
//   uri: 'https://shone-website-benh.vercel.app/api/graphql',
//   cache: new InMemoryCache()
// })
const httpLink = new HttpLink({
  // uri: API_LOCALHOST
  // uri: 'http://27879b22f36b.ngrok.io/api/graphql'
  uri: 'http://localhost:3000/api/graphql'
})

const client = new ApolloClient({
  link: ApolloLink.from([link as any, httpLink]),
  cache: new InMemoryCache()
})

export default client
