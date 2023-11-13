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
   return 'Hello world';
  }
}
