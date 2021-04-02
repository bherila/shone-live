import { NextApiRequest, NextApiResponse } from 'next'

import * as Backend from '../../nest/main'
export const config = {
  api: {
    bodyParser: false,
  },
}
export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    Backend.getListener().then((listener) => {
      listener(req, res)
      res.on('finish', resolve)
    })
  })
