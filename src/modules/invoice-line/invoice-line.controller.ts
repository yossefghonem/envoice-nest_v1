import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InvoiceLineService } from './invoice-line.service';
import { CreateLineDto, UpdateLineDto } from '../../dtos/invoice-line.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice-Line')
@Controller('invoice-line')
export class InvoiceLineController {
  constructor(private readonly invoiceService: InvoiceLineService) { }

  @Post()
  create(line: CreateLineDto) {
    return this.invoiceService.create(line)
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLine: UpdateLineDto) {
    return this.invoiceService.update(+id, updateLine)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.delete(+id)
  }
}
