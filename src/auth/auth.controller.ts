import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInDto, SignUpDto } from '../global/protos/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('signin')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    const access_token = req.headers.authorization.split(' ')[1];
    return this.authService.logout({ token: access_token });
  }

  @Get('getme')
  getme(@Req() req: Request) {
    const access_token = req.headers.authorization.split(' ')[1];
    return this.authService.getme({ token: access_token });
  }
}
