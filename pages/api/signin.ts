import { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from '../../entities/User'

const handler = (req: NextApiRequest, res: NextApiResponse): any => {
  createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'najam',
    entities: [User],
    synchronize: true,
    logging: false,
    port: 3306,
  })
    .then((connection) => {
      console.log('CONNECTEDDDDDDDDDDDDDDDD')
    })
    .catch((error) => console.log(error))
  res.status(200).json(req.body)
}

export default handler
