import { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'
import Connection from '../../lib/connection'
import User from '../../entities/User'

import { createHash } from 'crypto'
import { uuid } from 'uuidv4'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { firstName, lastName, email, password } = JSON.parse(req.body)

  const passwordSalt = uuid()

  const passwordHash = createHash('sha256')
    .update(passwordSalt + password)
    .digest('hex')

  try {
    if (await Connection) {
      //Connection.then((connection) => console.log(connection))
      let user = new User()
      user.firstName = firstName
      user.email = email
      user.lastName = lastName
      user.passwordSalt = passwordSalt
      user.passwordHash = passwordHash

      const connection = await Connection
      const newUser = await connection.manager.save(user)

      res.status(200).json({ email: newUser.email })
    } else {
      throw new Error('No connection :(')
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default handler
