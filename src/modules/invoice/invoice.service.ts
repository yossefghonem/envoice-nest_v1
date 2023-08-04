import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { InvoiceLine } from '../../entities/invoice-line.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private readonly repo: Repository<Invoice>,
  ) {}

  async create(invoiceDto: CreateInvoiceDto) {
    console.log('====================================');
    console.log(invoiceDto);
    console.log('====================================');
      const invoiceL: InvoiceLine = [{
              quantity: '1',
              internalCode:1,
              salesTotal: '1',
              total: '1',
              valueDifference: '1',
              totalTaxableFees: '1',
              netTotal: '1',
              itemsDiscount: '1',
              currencyExchangeRate: '1',
              discount_rate: '1',
              discount_amount: '1',
              item: { id: 1 },
              taxbleItem: [
                  {
                      id: 1,
                      rate: '1',
                      quantity: '1',
                      taxType: {
                          id: 1,
                      },
                      subTax: {
                          id: 1,
                      },
                  },
              ],
          },
      ];
    const newInvoice: Invoice = {
      documentType: invoiceDto.documentType,
      version: invoiceDto.version,
      docTtotalDiscountAmount: invoiceDto.docTtotalDiscountAmount,
      totalSalesAmount: invoiceDto.totalSalesAmount,
      internalID: invoiceDto.internalID,
      netAmount: invoiceDto.netAmount,
      user: { id: +invoiceDto.user },
      invoiceLines: invoiceL,
      
      /*
            invoiceLines: invoiceDto.invoiceLine.map(line => {
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
                    taxbleItem: line.taxbleItem.map(tax => {
                        return {
                            quantity: "1",
                            rate: tax.rate,
                            taxType: { id: 1 },
                            subTax: { id: 1 }
                        }
                    })
                }
            }), */
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
