import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { onError } from 'apollo-link-error'
import { API_STAGING, API_LOCALHOST } from '../utils/environment'
import StorageKeys from '../utils/StorageKeys'
import * as SecureStore from 'expo-secure-store'
import { setContext } from '@apollo/client/link/context'

const link = onError(({ graphQLErrors, networkError, operation, response }) => {
  console.log({ graphQLErrors, operation, response })
  if (graphQLErrors) {
    console.log({ graphQLErrors })

    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      console.log({ message, locations, path })
    })
  }
  if (networkError)
    console.log(`[Network error]: ${networkError}`, { networkError })
})

const getToken = async () => {
  try {
    const jwtToken = await SecureStore.getItemAsync(StorageKeys.AUTH_TOKEN)

    return jwtToken ? await JSON.parse(jwtToken) : ''
  } catch (err) {
    console.error('Token not found ' + (err.message || err))
  }
}

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  // uri: API_LOCALHOST
  // uri: 'http://27879b22f36b.ngrok.io/api/graphql'
  uri: 'http://localhost:3000/api/graphql'
})

const client = new ApolloClient({
  link: ApolloLink.from([authLink, link as any, httpLink]),
  cache: new InMemoryCache()
})

export default client
