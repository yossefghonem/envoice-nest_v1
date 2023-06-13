import { Controller, Post, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companys')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post('')
  create(@Body() c: any) {
    return this.companyService.create(c);
  }

  @Get("all")
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticDto: any) {
    return this.companyService.update(+id, updateStaticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
