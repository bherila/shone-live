import { NextApiRequest, NextApiResponse } from 'next'

import { serialize } from 'cookie'

const handler = (req: NextApiRequest, res: NextApiResponse): any => {
  res.setHeader('Set-Cookie', serialize('jwt', 'logged-out'))
  res.status(200).json({
    message: 'you are logged out',
  })
}

export default handler
