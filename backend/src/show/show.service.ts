import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserShowRole } from '../user-show-role/entities/user-show-role.entity'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { CreateShowDto } from './dto/create-show.dto'
import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private readonly showRepository: ShowRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserShowRole)
    private readonly userShowRoleRepository: UserShowRoleRepository,
  ) {}

  async create(data: CreateShowDto, userId: string): Promise<Show> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const show = this.showRepository.create({
      ownerUser: user,
      ...data,
    })
    const savedShow = await this.showRepository.save(show)
    const userShowRole = this.userShowRoleRepository.create({
      user,
      show,
      read: true,
      write: true,
      admin: true,
      streamTo: true,
    })
    await this.userShowRoleRepository.save(userShowRole)
    return savedShow
  }

  findOne(userId) {
    return this.showRepository.findOne(userId, {
      relations: ['chatMessages', 'showSegments', 'userShowRoles'],
    })
  }

  findAll() {
    return this.showRepository.find({
      relations: ['chatMessages', 'showSegments', 'userShowRoles'],
    })
  }
}
