import { Controller, Post, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('companys')
@ApiTags("Cpmany")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create(@Body() c: CreateCompanyDto) {
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
  update(@Param('id') id: string, @Body() update: UpdateCompanyDto) {
    return this.companyService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
