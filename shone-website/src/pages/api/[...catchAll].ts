import { NextApiRequest, NextApiResponse } from 'next'

import * as Backend from '../../backend/main'

export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    Backend.getListener().then((listener) => {
      listener(req, res)
      res.on('finish', resolve)
    })
  })
