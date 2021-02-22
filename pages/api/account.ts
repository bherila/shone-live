import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'

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

      if (Date.now() >= jwtData.exp * 1000) {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('Session expired! please login again')
      }

      const db = await requireDb
      const user = await db.users.findOne({ id: jwtData.id })

      if (!user) {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('User not found! please login again')
      }

      const { firstName, lastName, email, password, newPassword } = JSON.parse(
        req.body
      )

      if (password === '') {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('Please enter your current password to change data')
      }

      const passwordHash = createHash('sha256')
        .update(user.passwordSalt + password)
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
          }

          const updatedUser = await db.users.save(user)
        }
      } else {
        error = true
        res.statusCode = StatusCodes.BAD_REQUEST
        throw new Error('wrong current password!')
      }
    }
  } catch (err) {
    res.status(error ? res.statusCode : StatusCodes.SERVER_ERROR).json({
      status: 'error',
      message: error ? err.message : 'Something went wrong!',
    })
  }
}

export default handler
