import { Injectable } from '@nestjs/common'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { NewUser, User } from './user-entity'
import { Repository } from 'typeorm'
import { Service } from 'typedi'

@Service()
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(phone, code): Promise<NewUser> {
    const newUser = new User()
    newUser.phone = phone
    newUser.username = Math.random().toString(36).substring(2, 7)
    newUser.verificationCode = code
    newUser.verificationCodeTimeSent = new Date().toUTCString()
    return await this.userRepository.save(newUser)
  }

  async sendVerificationCode(code, phone) {
    try {
      const client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN)
      client.messages
        .create({
          body: 'Hello , Your verififcation code is ' + code,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        }).then((message) => {
          console.log('message.sid', message.sid);
        }).catch((e) => { console.log(`\n error in twilio => `, e) })
    } catch (error) {
      console.log('error => ', error)
      return false
    }
  }
}
