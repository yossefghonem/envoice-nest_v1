import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StaticService } from './static.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('static')
@ApiTags("static")
export class StaticController {
  constructor(private readonly staticService: StaticService) { }

  @Post('seedActivity')
  create() {
    return this.staticService.seedActivites();
  }

  @Get("activities")
  findAll() {
    return this.staticService.findAll();
  }

  @Post('seedGpc')
  createGpc() {
    return this.staticService.seedGpcCode();
  }

  @Get("gpc")
  findAllGpc(@Query() search: string) {
    return this.staticService.findAllGpc(search);
  }

  @Get("/units")
  findAllUnits() {
    return this.staticService.findAllUnits();
  }

  // ============================units================================================
  @Post('seedUnit')
  createUnits() {
    return this.staticService.seedUnits();
  }
}
