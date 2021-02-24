import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'
import { uuid } from 'uuidv4'
import { serialize } from 'cookie'

import StatusCodes from '../../lib/StatusCodes'
import requireDb from '../../lib/DB'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let error = false

  try {
    if (req.cookies.jwt && req.cookies.jwt !== 'logged-out') {
      const jwtData = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)

      if (!jwtData) {
        error = true
        res.statusCode = StatusCodes.UNAUTHORIZED
        throw new Error('sign in again required!')
      }

      if (Date.now() >= jwtData.exp * 1000) {
        error = true
        res.statusCode = StatusCodes.UNAUTHORIZED
        throw new Error('Session expired! please sign in again')
      }

      const db = await requireDb
      const user = await db.users.findOne({ id: jwtData.id })

      if (!user) {
        error = true
        res.statusCode = StatusCodes.UNAUTHORIZED
        throw new Error('User not found! please sign in again')
      }

      const {
        firstName,
        lastName,
        email,
        currentPassword,
        newPassword,
      } = JSON.parse(req.body)

      if (
        firstName === '' &&
        lastName === '' &&
        email === '' &&
        newPassword === ''
      ) {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('Update atleast 1 field to submit!')
      }

      if (currentPassword === '') {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('Please enter your current password to change data')
      }

      const passwordHash = createHash('sha256')
        .update(user.passwordSalt + currentPassword)
        .digest('hex')

      if (passwordHash === user.passwordHash) {
        if (req.method == 'POST') {
          if (firstName != '') user.firstName = firstName
          if (lastName != '') user.lastName = lastName
          if (email != '') user.email = email

          if (newPassword != '') {
            const newPasswordSalt = uuid()
            const newPasswordHash = createHash('sha256')
              .update(newPasswordSalt + newPassword)
              .digest('hex')

            user.passwordHash = newPasswordHash
            user.passwordSalt = newPasswordSalt

            const token = jwt.sign(
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
              serialize('jwt', token, {
                maxAge:
                  Date.now() + Number(process.env.JWT_COOKIE_AGE) * 86400000,
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
              })
            )
          }

          const updatedUser = await db.users.save(user)
          res.status(StatusCodes.OK).json({
            status: 'success',
            user: {
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
            },
          })
        }
      } else {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('wrong current password!')
      }
    } else {
      error = true
      res.statusCode = StatusCodes.UNAUTHORIZED
      throw new Error('Please sign in first!')
    }
  } catch (err) {
    res.status(error ? res.statusCode : StatusCodes.SERVER_ERROR).json({
      status: 'error',
      message: error ? err.message : 'Something went wrong!',
    })
  }
}

export default handler
