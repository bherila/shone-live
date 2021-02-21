import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

import requireDb from '../../lib/DB'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let data = {}
  if (req.cookies.jwt !== 'logged-out') {
    try {
      const jwtData = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)

      const db = await requireDb
      const user = await db.users.findOne({ id: jwtData.id })

      if (req.method == 'POST' && user.id) {
        const { firstName, lastName, email } = JSON.parse(req.body)

        user.firstName = firstName
        user.lastName = lastName
        user.email = email

        const updatedUser = await db.users.save(user)

        data = updatedUser
      } else {
        data = user
      }
    } catch (err) {
      data = {
        message: 'user not logged in',
      }
    }
  } else {
    data = {
      message: 'user not logged in',
    }
  }

  res.status(200).json(data)
}

export default handler
