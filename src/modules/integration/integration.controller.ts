import { Controller, Post, Body, Get, Session, Req } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import {Request} from 'express'
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  login(@Body() body:InvoiceLoginDto){
    return this.integrationService.invoiceLogin(body)
  }

  @Get()
  getViews() {
    // session.views = (session.views || 0) + 1;
    // session.token="ddddddd"
    // session.cookie.maxAge=360
    this.integrationService.storeToken("token","ssss")
  }


  @Get('get')
  www() {
    // session.views = (session.views || 0) + 1;
    // session.token="ddddddd"
    // session.cookie.maxAge=360
   return this.integrationService.getToken("token")
  }
}
