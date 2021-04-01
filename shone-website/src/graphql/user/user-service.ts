import { Injectable } from '@nestjs/common'
import { decode, encode } from 'next-auth/jwt'
import Twilio from 'twilio'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { v4 as uuidv4 } from 'uuid'

import { NewUser, User } from './user-entity'

@Service()
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(phone, code): Promise<NewUser> {
    const newUser = new User()
    newUser.phone = phone
    newUser.username = uuidv4()
    newUser.verificationCode = code
    newUser.verificationCodeTimeSent = new Date().toUTCString()
    return await this.userRepository.save(newUser)
  }

  async sendVerificationCode(phone, code) {
    try {
      const client = Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      )
      const message = await client.messages.create({
        body: 'Hello, Your verification code is ' + code,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      })
      console.log('message.sid', message.sid)
    } catch (error) {
      console.log('error => ', error)
      return false
    }
  }

  async verifycode(userId, code) {
    const {
      verificationCodeTimeSent,
      verificationCode,
      phone,
    } = await this.userRepository.findOne(userId)
    const cuerrntTime = new Date().toUTCString()
    const findDiff =
      (new Date(cuerrntTime).getTime() -
        new Date(verificationCodeTimeSent).getTime()) /
      60000
    if (findDiff > 5) throw new Error('this code is expried')
    if (verificationCode == code) throw new Error('Worng code')
    const payload = {
      userId,
      phone,
    }
    console.log(`payload`, payload)
    const token = await encode({
      secret: process.env.JWT_SECRET,
      payload,
    })
    console.log(`token`, token)
    console.log(
      `jwt.decode()`,
      await decode({ secret: process.env.JWT_SECRET, token }),
    )
    return { token }
  }
}
