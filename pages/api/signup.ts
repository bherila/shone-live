import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse): any => {
  //const { firstName, lastName, email, password } = JSON.parse(req.body)

  res.status(200).json(req.body)
}

export default handler
