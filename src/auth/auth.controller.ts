import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { jwtResponse } from './dto/jwt.response';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'returns JWT token if vaid username and password' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized if not valid credentials.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `returns "created" after making new JWT if valid credentials.
    Token valid for ${process.env.JWT_TIMEOUT}`,
    // TODO figure out how to fix this
    // https://github.com/nestjs/swagger/issues/1018
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<jwtResponse> {
    return this.authService.login(loginDto.email);
  }

  @Post('/register')
  @ApiOperation({ summary: 'returns JWT token if vaid username and password' })
  // TODO figure out what happens if invalid credentials
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `creates a user record and an auth record, returns JWT.
    Token valid for ${process.env.JWT_TIMEOUT}`,
    // TODO figure out how to fix this
    // https://github.com/nestjs/swagger/issues/1018
  })
  async create(@Body() createAuthDto: RegisterDto): Promise<jwtResponse> {
    return this.authService.register(createAuthDto);
  }
}
