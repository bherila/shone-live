import { Injectable } from '@nestjs/common'
import Twilio from 'twilio'
import { Service } from 'typedi'
import { v4 as uuidv4 } from 'uuid'

import { newUser } from './dto/newUserDto'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

@Service()
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(phone, code): Promise<newUser> {
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
        body: `Your SHONE verification code is ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      })
      console.info('message.sid', message.sid)
    } catch (error) {
      console.error('error => ', error)
      return false
    }
  }

  async verifySmsCode(userId, code) {
    const {
      verificationCodeTimeSent,
      verificationCode,
    } = await this.userRepository.findOne(userId)
    const currentTime = new Date().toUTCString()
    const findDiff =
      (new Date(currentTime).getTime() -
        new Date(verificationCodeTimeSent).getTime()) /
      60000
    if (findDiff > 5) throw new Error('this code is expired')
    if (verificationCode == code) throw new Error('wrong code')
    // const Payload = {
    //   userId,
    //   phone,
    // }
    // console.log(`payload`, Payload)
    // console.log(`jwt`, jwt)
    // const token = await jwt.encode({
    //   secret: process.env.JWT_SECRET,
    //   Payload,
    // })
    // console.log(`token`, token)
    // console.log(
    //   `jwt.decode()`,
    //   await jwt.decode({ secret: process.env.JWT_SECRET, token }),
    // )
    return { token: null }
  }
  async findOne(userId) {
    return this.userRepository.findOne(userId)
  }

  findAll() {
    return this.userRepository.find()
  }
}
