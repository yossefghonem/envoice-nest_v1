import { JwtAuthGuard } from './../../guards/jwt.guard';
import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from '../../dtos/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  userLogin(@Body() user: LoginDto) {

    return this.authService.Login(user);
  }

  @Post('/register')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.CreateUser(user);
  }

}
