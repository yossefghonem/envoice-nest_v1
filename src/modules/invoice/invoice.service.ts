import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, EnvoiceResponseDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
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

  async findAll()  {
    // return envoiceResponseDto
    const resss =await this.repo.find();

    return resss
  }

  async findOne(id: number) :Promise<EnvoiceResponseDto> {
    const enviceDb=await this.repo.findOneBy({ id: id });

    console.log(enviceDb);
    const res1:EnvoiceResponseDto={
      issuer: {
          address:{
            branchID:enviceDb.user.branch.id+'',
            country: enviceDb.user.branch.address.country,
            governate: enviceDb.user.branch.address.governerate,
            regionCity: enviceDb.user.branch.address.regionCity,
            street: enviceDb.user.branch.address.street,
            buildingNumber: enviceDb.user.branch.address.buildingNumber,
            postalCode: string;
            floor: string;
            room: string;
            landmark: string;
            additionalInformation: string;
          }
      },
      receiver,
      documentType:enviceDb.documentType
    }
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // return this.repo.update(id, updateInvoiceDto)
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
