import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtResponseWithUser } from './responses/jwt.response-with-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: `returns JWT token if vaid username and password,
    includes user object for client convenience`,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized if not valid credentials.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `returns "created" after making new JWT if valid credentials.
    Token valid for ${process.env.JWT_TIMEOUT}`,
    type: JwtResponseWithUser,
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<JwtResponseWithUser> {
    return this.authService.login(loginDto.email);
  }

  @Post('/register')
  @ApiOperation({
    summary: `returns JWT token if vaid username and password,
  also returns the user object with the parameters passed in`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `creates a user record and an auth record, returns JWT.
    Token valid for ${process.env.JWT_TIMEOUT}`,
    type: JwtResponseWithUser,
  })
  async create(
    @Body() createAuthDto: RegisterDto,
  ): Promise<JwtResponseWithUser> {
    return this.authService.register(createAuthDto);
  }
}
