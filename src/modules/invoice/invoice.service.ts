import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { InvoiceLine } from '../../entities/invoice-line.entity';
import { TaxbleItem } from 'src/entities/taxbleItems.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private readonly repo: Repository<Invoice>,
  ) {}

  async create(invoiceDto: CreateInvoiceDto) {
    console.log('====================================');
    console.log(invoiceDto);
    console.log('====================================');

    
    const newInvoice: Invoice = {
      documentType: invoiceDto.documentType,
      version: invoiceDto.version,
      docTtotalDiscountAmount: invoiceDto.docTtotalDiscountAmount,
      totalSalesAmount: invoiceDto.totalSalesAmount,
      internalID: invoiceDto.internalID,
      netAmount: invoiceDto.netAmount,
      user: { id: +invoiceDto.user },
      invoice_line: invoiceDto.invoiceLines.map((line) => {
        return {
          quantity: line.quantity,
          salesTotal: line.salesTotal,
          total: '9',
          valueDifference: line.valueDifference,
          totalTaxableFees: line.totalTaxableFees,
          netTotal: line.netTotal,
          itemsDiscount: line.itemsDiscount,
          currencyExchangeRate: line.currencyExchangeRate,
          discount_rate: line.discount_rate,
          discount_amount: line.discount_amount,
          internalCode: line.internalCode,
          item: line.item,
          taxbleItem: line.taxbleItem.map((tax) => {
            return {
              quantity: tax.quantity,
              rate: tax.rate,
              taxType: tax.taxType,
              subTax: tax.subTax,
            } as TaxbleItem;
          }),
        } as InvoiceLine;
      }),
    };

    console.log('====================================');
    console.log(newInvoice);
    console.log('====================================');
    return await this.repo.save(newInvoice);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // return this.repo.update(id, updateInvoiceDto)
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
