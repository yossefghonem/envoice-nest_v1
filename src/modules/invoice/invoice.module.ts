import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { InvoiceLine } from '../../entities/invoice-line.entity';
import { TaxbleItem } from '../../entities/taxbleItems.entity';

@Module({
  imports:  [TypeOrmModule.forFeature([Invoice,InvoiceLine,TaxbleItem])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports:[InvoiceService]
})
export class InvoiceModule {  }
