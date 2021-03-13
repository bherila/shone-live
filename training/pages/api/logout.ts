import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse): any => {
  res.status(200).json(req.body)
}

export default handler
