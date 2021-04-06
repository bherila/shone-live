import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import Twilio from 'twilio'
import { Service } from 'typedi'
import { v4 as uuidv4 } from 'uuid'

import { newUser } from './dto/newUserDto'
import { UserRepository } from './user.repository'
import jwt from 'jsonwebtoken'
@Service()
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(phone, code): Promise<newUser> {
    const newUser = this.userRepository.create({
      phone,
      username: uuidv4(),
      verificationCode: code,
      verificationCodeTimeSent: new Date().toUTCString(),
    })
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
      phone
    } = await this.findOne(userId)
    const currentTime = new Date().toUTCString()
    const findDiff =
      (new Date(currentTime).getTime() -
        new Date(verificationCodeTimeSent).getTime()) /
      60000
    if (findDiff > 5) throw new HttpException('code expired',HttpStatus.BAD_REQUEST)
    if (verificationCode == code) throw new HttpException('Wrong code',HttpStatus.BAD_REQUEST)
    const Payload = {
      userId,
      phone,
    }
    const secretKey = process.env.JWT_SECRET
    const token = await jwt.sign(Payload,secretKey)
    console.log(`secretKey`, secretKey)
    console.log(`jwt.verify(token,key)`, jwt.verify(token,secretKey))
    return {token}
  }

  findOne(userId) {
    return this.userRepository.findOne(userId)
  }

  findAll() {
    return this.userRepository.find()
  }
}
