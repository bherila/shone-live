import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'next-cookies'

import 'reflect-metadata'
import Connection from '../../lib/connection'
import User from '../../entities/User'

import { createHash } from 'crypto'
import { uuid } from 'uuidv4'
import connection from '../../lib/connection'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email, password } = JSON.parse(req.body)
  let response = {
    statusCode: null,
    message: '',
  }
  try {
    if (await Connection) {
      const connection = await Connection
      const repository = await connection.getRepository(User)

      const user = await repository.findOne({ email: email })

      if (user) {
        const passwordHash = createHash('sha256')
          .update(user.passwordSalt + password)
          .digest('hex')

        if (passwordHash === user.passwordHash) {
          response.statusCode = 200
          response.message = 'logged in'
        } else {
          response.statusCode = 400
          response.message = 'wrong password'
        }
      } else {
        response.statusCode = 400
        response.message = 'User not found'
      }

      res.status(response.statusCode).json({ message: response.message })
    } else {
      throw new Error('No connection :(')
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default handler
