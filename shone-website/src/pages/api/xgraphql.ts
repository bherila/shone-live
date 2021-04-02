import { NextApiRequest, NextApiResponse } from 'next'

import { getApolloServer } from '../../graphql'

async function getApolloHandler() {
  const server = await getApolloServer()
  return server.createHandler({ path: '/api/graphql' })
}

// NextJS should disable body parsing because apollo-server-micro will do it
export const config = {
  api: {
    bodyParser: false,
  },
}

// Pass request from NextJS to apollo-server
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const handler = await getApolloHandler()
    await handler(req, res)
  } catch (err) {
    res.json(err.message || err || 'Internal Server Error')
    res.status(500)
  }
}
