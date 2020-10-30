import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { jwtResponse } from './dto/jwt.response';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(email: string): Promise<jwtResponse> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return {
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async register(registerDto: RegisterDto): Promise<jwtResponse> {
    const user = await this.usersService.create(registerDto.user);
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const auth = await this.authRepository.create({
      identifier: user.email,
      password: hashedPassword,
      user: user,
    });
    this.authRepository.save(auth);
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async validate(email: string, password: string): Promise<boolean> {
    try {
      // TODO update this to use most recent from many
      // since same user may update password
      // and we want to keep an immutable record of all
      // the restets (this also will need created at/updated at)
      // set on all tables and also figure out how to make records
      // immutable in typeorm/make sure code doesn't try to modify
      const auth = await this.authRepository.findOne({
        where: { identifier: email },
      });
      const pw_good = await bcrypt.compare(password, auth.password);

      return pw_good;
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
  }
}
