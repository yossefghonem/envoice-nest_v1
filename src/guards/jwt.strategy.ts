import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../modules/user/user.service';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserRole } from '../enums/userRole.enum';
import { LicenseService } from '../modules/license/license.service';

export interface JwtUser {
  id: string;
  pin: string;
  role: UserRole;
  client_id: string;
  client_secret: string;
  certificate: string;
  dllLibPath: string;
  access_token: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly licenseService: LicenseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.TOKEN_SECRET,
      algorithm: "HS256",
    });
  }

  async validate(payload: any) {
    console.log('====================================');
    console.log(payload);
    console.log('====================================');
    // const user = await this.licenseService.isValidLicense(payload.id);
    // console.log("5555555555555", user)
    // if (!user) {
    //   throw new UnauthorizedException("User License is expired");
    // }

    const tokenPayload: JwtUser = {
      id: payload.id,
      pin: payload.pin,
      role: payload.role,
      client_id: payload.client_id,
      client_secret: payload.client_secret,
      certificate: payload.certificate,
      dllLibPath: payload.dllLibPath,
      access_token: payload.access_token
    }

    return tokenPayload;
  }
}
