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
  let error = false

  try {
    if (email === '' || password === '') {
      error = true
      res.statusCode = StatusCodes.BAD_REQUEST
      throw new Error('Incomplete data')
    }

    const db = await requireDb
    const user = await db.users.findOne({ email: email })

    if (user) {
      const passwordHash = createHash('sha256')
        .update(user.passwordSalt + password)
        .digest('hex')

      if (passwordHash === user.passwordHash) {
        const userToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        )

        res.setHeader(
          'Set-Cookie',
          serialize('user', userToken, {
            maxAge: Date.now() + Number(process.env.JWT_COOKIE_AGE) * 86400000,
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
          })
        )
      } else {
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('email or password is wrong!')
      }
    } else {
      error = true
      res.statusCode = StatusCodes.BAD_REQUEST
      throw new Error('User not found')
    }

    const authToken = jwt.sign(
      {
        username: `${user.firstName} ${user.lastName}`,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    )
    res.status(StatusCodes.OK).json({
      status: 'success',
      auth: authToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (err) {
    res.status(error ? res.statusCode : StatusCodes.SERVER_ERROR).json({
      status: 'error',
      message: error ? err.message : 'Something went wrong!',
    })
  }
}

export default handler
