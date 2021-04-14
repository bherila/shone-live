import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from 'apollo-link-error'

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/api/graphql',
})

const client = new ApolloClient({
  link: ApolloLink.from([link as any, httpLink]),
  cache: new InMemoryCache(),
})

export default client
