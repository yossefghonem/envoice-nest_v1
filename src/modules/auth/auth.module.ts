import { IntegrationModule } from './../integration/integration.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { LicenseModule } from '../license/license.module';
import { IntegrationService } from '../integration/integration.service';
import { CompanyService } from '../company/company.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { InvoiceService } from '../invoice/invoice.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { algorithm: 'HS256', expiresIn: '1h' },
    }),
    // import modules
    UserModule,
    LicenseModule,
    IntegrationModule,
    CompanyModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})

export class AuthModule { }
