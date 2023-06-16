import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../modules/user/user.service';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserRole } from '../enums/userRole.enum';
import { LicenseService } from '../modules/license/license.service';

export interface JwtUser {
  id: string;
  taxNumber: string;
  // role: UserRole
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
    const user = await this.licenseService.isValidLicense(payload.id);
    console.log("5555555555555", user)
    if (!user) {
      throw new UnauthorizedException("User License is expired");
    }
    let tokenPayload: JwtUser
    tokenPayload = {
      id: payload.id,
      taxNumber: payload.username,
      // role: payload.role
    }

    return tokenPayload;
  }


}
