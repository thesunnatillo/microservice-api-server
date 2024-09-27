import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  GetMeDto,
  LogOutDto,
  SignInDto,
  SignUpDto,
} from 'globals/protos/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;
  constructor(@Inject('AUTH') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  signup(signUpDto: SignUpDto) {
    return this.authServiceClient.signUp(signUpDto);
  }

  signin(signInDto: SignInDto) {
    return this.authServiceClient.signIn(signInDto)
  }

  logout(logOutDto: LogOutDto) {
    return this.authServiceClient.logOut(logOutDto)
  }

  getme(getMeDto: GetMeDto) {
    return this.authServiceClient.getMe(getMeDto)
  }
}
