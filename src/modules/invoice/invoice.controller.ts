import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body() daat: CreateInvoiceDto) {
    return this.invoiceService.create(daat);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateData)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id)
  }
}
