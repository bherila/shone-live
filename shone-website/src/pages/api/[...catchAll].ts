import * as Backend from '../../backend/main'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    Backend.getListener().then((listener) => {
      listener(req, res)
      res.on('finish', resolve)
    })
  })
