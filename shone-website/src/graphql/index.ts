// eslint-disable-next-line simple-import-sort/imports
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import DB from './DB'
import { User } from './user/user-entity'
import { Show } from './show/show-entity'
import { MessageEntity } from './message/message-entity'

import { UserResolver } from './user/user-resolver'
import { ShowResolver } from './show/show-resolver'
import { MessageEntityResolver } from './message/message-resolver'

// Request context (for future use)
export interface Context {
  // This will be populated with the authenticated User from the JWT, or null if user is not logged in.
  user: User | null
  show: Show | null
  message: MessageEntity | null
}

export async function getApolloServer() {
  // Wait till db is initialized.
  await DB

  // seed database with some data
  // const { defaultUser } = await seedDatabase();

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver, ShowResolver, MessageEntityResolver],
    container: Container,
  })

  // create mocked context
  const context: Context = { user: null, show: null, message: null }

  // Create GraphQL server
  return new ApolloServer({ schema, context })
}
