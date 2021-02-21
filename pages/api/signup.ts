import { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'
import { createHash } from 'crypto'
import { uuid } from 'uuidv4'
import User from '../../lib/entities/User'
import requireDb from '../../lib/DB'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

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
    const db = await requireDb
    const user = new User()
    user.firstName = firstName
    user.email = email
    user.lastName = lastName
    user.passwordSalt = passwordSalt
    user.passwordHash = passwordHash
    const newUser = await db.manager.save(user)

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    )
    res.setHeader(
      'Set-Cookie',
      serialize('jwt', token, { maxAge: Date.now() + 86400000 })
    )
    res.status(200).json({ email: newUser.email })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default handler
