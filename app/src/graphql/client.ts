import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { onError } from 'apollo-link-error'
import StorageKeys from '../utils/StorageKeys'
import * as SecureStore from 'expo-secure-store'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }
  if (networkError)
    console.error(`[Network error]: ${networkError}`, { networkError })
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
  link: ApolloLink.from([
    authLink,
    link as any,
    httpLink,
    createUploadLink({ uri: 'http://localhost:3000/api/graphql' })
  ]),
  cache: new InMemoryCache()
})

export default client
