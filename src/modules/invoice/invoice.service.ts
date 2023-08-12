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

  /*
  valueDifference
  totalTaxableFees
  itemsDiscount
  */
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
      user: { id: +invoiceDto.user },
      client: { id: +invoiceDto.client },
      invoice_line: invoiceDto.invoiceLines.map((line) => {
        return {
          quantity: +line.quantity,
          price:+line.price,
          valueDifference: +line.valueDifference,
          totalTaxableFees: +line.totalTaxableFees,
          itemsDiscount: +line.itemsDiscount,
          currencyExchangeRate: line.currencyExchangeRate,
          discount_rate: line.discount_rate,
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
