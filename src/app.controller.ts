import { UseGuards } from '@nestjs/common/decorators';
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';

// @UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('save')
  async getHelloppp(@Req() req: Request) {
    // this.cacheManager.store.set()
    // return await this.cacheManager.set('key', 'value');
  }

  @Get()
  async getHello(@Req() req: Request) {
    // return this.sessionSer.getToken();
    // return req.session
    // req.session.cookie.domain="ddddddd"
    // req.session.cookie.secure=true
    // req.session.cookie.maxAge=36000
    // return await this.cacheManager.get('key');
  }
}
