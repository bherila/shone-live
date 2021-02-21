import { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import requireDb from '../../lib/DB'
import { createHash } from 'crypto'
import StatusCodes from '../../lib/StatusCodes'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email, password } = JSON.parse(req.body)
  const response = {
    statusCode: null,
    message: '',
  }
  try {
    const db = await requireDb
    const user = await db.users.findOne({ email: email })

    if (user) {
      const passwordHash = createHash('sha256')
        .update(user.passwordSalt + password)
        .digest('hex')

      if (passwordHash === user.passwordHash) {
        response.statusCode = StatusCodes.OK
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        )
        res.setHeader(
          'Set-Cookie',
          serialize('jwt', token, {
            maxAge: Date.now() + Number(process.env.JWT_COOKIE_AGE) * 86400000,
          })
        )
        response.message = 'logged in'
      } else {
        response.statusCode = StatusCodes.BAD_REQUEST
        response.message = 'wrong password'
      }
    } else {
      response.statusCode = StatusCodes.BAD_REQUEST
      response.message = 'User not found'
    }

    res.status(response.statusCode).json({ message: response.message })
  } catch (err) {
    res.status(StatusCodes.SERVER_ERROR).json({ error: err })
  }
}

export default handler
