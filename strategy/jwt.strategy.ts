import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ac-scrt',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    const user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    console.log("Foydalanuvchi ma'lumotlari:", user);
    return user;
  }
}
