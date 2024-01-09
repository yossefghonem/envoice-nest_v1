import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/enums/userRole.enum';
import { Role } from 'src/guards/roles.decorator';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Role([UserRole.USER])
  @Post()
  create(@Body() daat: CreateInvoiceDto, @Req() req: any) {
    return this.invoiceService.create(daat, req.user);
  }

  @Role([UserRole.USER])
  @Get()
  findAll(@Req() req: any,
   @Query('page') page: number,
    @Query('pageSize') pageSize: number, 
  ) {
    return this.invoiceService.findAll(req.user, page ?? 1, pageSize ?? 20);
  }

  @Role([UserRole.USER])
  @Get('submit/:id')
  submitDocument(@Req() req: any, @Param('id') id: string) {
    console.log(req.user);
    return this.invoiceService.submitDocument(+id, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
