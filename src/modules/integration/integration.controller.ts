import { Controller, Post, Body, Get, Req,Param } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import {Request} from 'express'
import { Role } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/userRole.enum';
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Role([UserRole.SUPERADMIN])
  @Post()
  login(@Req() req:any){
    return this.integrationService.invoiceLogin(req.user)
  }

  
  @Role([UserRole.USER])
  @Get('submit/:id')
  submitDocument(@Req() req:any,@Param('id') id: string) {
    console.log(req.user)
    return this.integrationService.sendInvoice(+id,req.user);
  }

  @Get()
  getViews() {
    // session.views = (session.views || 0) + 1;
    // session.token="ddddddd"
    // session.cookie.maxAge=360
    // this.integrationService.storeToken("token","ssss")
  }


  @Post('generate')
  async www(@Body() body:any) {
    // session.views = (session.views || 0) + 1;
    // session.token="ddddddd"
    // session.cookie.maxAge=360
   

    

   return this.integrationService.generateSigniture(body,"43397696","Egypt Trust CA G6")
  }
}
