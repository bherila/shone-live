import { NextApiRequest, NextApiResponse } from 'next'

import requireDb from '../../lib/DB'
import StatusCodes from '../../lib/StatusCodes'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { email } = JSON.parse(req.body)

  let error = false

  try {
    if (email === '') {
      error = true
      res.statusCode = StatusCodes.BAD_REQUEST
      throw new Error('Please provide your email')
    }

    const db = await requireDb
    const user = await db.users.findOne({ email: email })

    if (user) {
      //TODO logic to send confirmation email with reset token to user

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Sorry service not working right now. Please try again later',
      })
    } else {
      error = true
      res.status(StatusCodes.BAD_REQUEST)
      throw new Error('This email is not registered!')
    }
  } catch (err) {
    res.status(error ? res.statusCode : 500).json({
      status: 'error',
      message: error ? err.message : 'Something went wrong!',
    })
  }
}

export default handler
