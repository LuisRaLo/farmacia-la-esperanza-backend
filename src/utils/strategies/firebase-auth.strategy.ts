import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'bebf100eadda332ec8fea57f9b5bc3a6ab29f555',
    });
  }

  validate(payload: any) {
    console.log(payload);
    const user = {
      user_id: payload.sub,
      email: payload.email,
    };
    return user;
  }
}
