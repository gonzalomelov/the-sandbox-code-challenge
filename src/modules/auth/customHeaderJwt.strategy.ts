import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomHeaderJwtStrategy extends PassportStrategy(
  Strategy,
  'customHeaderJwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('create-tutorial-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    // Automatically checks expiration time
    return payload;
  }
}
