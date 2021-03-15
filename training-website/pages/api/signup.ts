import { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'
import { createHash } from 'crypto'
import { uuid } from 'uuidv4'
import User from '../../lib/entities/User'
import requireDb from '../../lib/DB'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import StatusCodes from '../../lib/StatusCodes'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { firstName, lastName, email, password, confirmPassword } = JSON.parse(
    req.body
  )
  let error = false

  try {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      error = true
      res.statusCode = StatusCodes.BAD_REQUEST
      throw new Error('Incomplete data')
    }

    if (password != confirmPassword) {
      error = true
      res.statusCode = StatusCodes.BAD_REQUEST
      throw new Error('Passwords do not match!')
    }

    const passwordSalt = uuid()

    const passwordHash = createHash('sha256')
      .update(passwordSalt + password)
      .digest('hex')

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
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    )

    res.setHeader(
      'Set-Cookie',
      serialize('jwt', token, {
        maxAge: Date.now() + 86400000,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      })
    )
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    })
  } catch (err) {
    res.status(error ? res.statusCode : StatusCodes.SERVER_ERROR).json({
      status: 'error',
      message: error ? err.message : 'Something went wrong',
    })
  }
}

export default handler
