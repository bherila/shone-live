import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import DB from './DB'
import { User } from './user-entity'
import { UserResolver } from './user-resolver'

// Request context (for future use)
export interface Context {
  // This will be populated with the authenticated User from the JWT, or null if user is not logged in.
  user: User | null
}

export async function getApolloServer() {
  // Wait till db is initialized.
  await DB

  // seed database with some data
  // const { defaultUser } = await seedDatabase();

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container,
  })

  // create mocked context
  const context: Context = { user: null }

  // Create GraphQL server
  return new ApolloServer({ schema, context })
}
