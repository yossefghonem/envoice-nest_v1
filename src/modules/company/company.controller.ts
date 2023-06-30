import { JwtAuthGuard } from './../../guards/jwt.guard';
import { Controller, Post, Get, Param, Patch, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('companys')
@ApiTags("Cpmany")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() c: CreateCompanyDto, @Req() req: any) {
    // if(req.user.)
    return this.companyService.create(c);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  findAll(@Req() req: any) {
    return this.companyService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: UpdateCompanyDto) {
    return this.companyService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
