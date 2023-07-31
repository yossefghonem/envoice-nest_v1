import { Module } from '@nestjs/common';
import { InvoiceLineService } from './invoice-line.service';
import { InvoiceLineController } from './invoice-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceLine } from '../../entities/invoice-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceLine])],
  controllers: [InvoiceLineController],
  providers: [InvoiceLineService]
})
export class InvoiceLineModule { }
