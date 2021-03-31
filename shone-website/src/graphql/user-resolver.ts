import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserService } from './user-service'
import { User, UserWithToken } from './user-entity'
import { sign } from 'jsonwebtoken';
@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UserService
  ) { }

  @Query(() => User, { nullable: true })
  user(@Arg('userId', (type) => Int) userId: number) {
    return this.userRepository.findOne(userId)
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userRepository.find()
  }

  @Mutation(() => User)
  async addUser(@Arg('phone') phone: string) {
    const code = Math.floor(1000 + Math.random() * 9000);
    await this.usersService.sendVerificationCode(phone, code);
    return await this.usersService.create(phone, code);
  }

  @Query(() => UserWithToken)
  async verifyCode(@Arg('userId') userId: number,@Arg('code') code: number) {
    const { verificationCodeTimeSent, verificationCode, phone } = await this.userRepository.findOne(userId);
    const cuerrntTime = new Date().toUTCString();
    const findDiff = (new Date(cuerrntTime).getTime() - new Date(verificationCodeTimeSent).getTime()) / 60000;
    if (findDiff > 5) throw new Error('this code is expried');
    if (code !== verificationCode) throw new Error("Worng code");
    const payload = {
      userId,
      phone
    }
    const token = sign(payload, process.env.SECRET_ACCESS_KEY, { algorithm: 'HS256' });
    console.log(`token`, token)
    return { token };
  }

}
