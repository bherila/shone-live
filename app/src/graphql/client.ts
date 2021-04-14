import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat
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
  if (networkError) console.log(`[Network error]: ${networkError}`)
})
const defaultHeaders = {
  Accept: 'application/*',
  'Content-Type': '*/*'
}

const getToken = async () => {
  const token = await SecureStore.getItemAsync(StorageKeys.AUTH_TOKEN)
    .then(res => res && JSON.parse(res))
    .then(jwt => {
      const token = jwt
      return token
    })
    .catch(e => console.log('Token not found', { e }))

  return token
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
