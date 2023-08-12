import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, EnvoiceResponseDto, InvoicelineDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';
import { InvoiceLine } from '../../entities/invoice-line.entity';
import { TaxbleItem } from 'src/entities/taxbleItems.entity';
import { ItemTypes } from '../../enums/itemTypes.enum';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private readonly repo: Repository<Invoice>,
  ) { }

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
      purchaseOrderReference: invoiceDto.purchaseOrderReference,
      purchaseOrderDescription: invoiceDto.purchaseOrderDescription,
      salesOrderReference: invoiceDto.salesOrderReference,
      salesOrderDescription: invoiceDto.salesOrderDescription,
      proformaInvoiceNumber: invoiceDto.proformaInvoiceNumber,
      user: { id: +invoiceDto.user },
      client: { id: +invoiceDto.client },
      invoice_line: invoiceDto.invoiceLines.map((line) => {
        return {
          quantity: +line.quantity,
          price: +line.price,
          valueDifference: +line.valueDifference,
          totalTaxableFees: +line.totalTaxableFees,
          itemsDiscount: +line.itemsDiscount,
          currencyExchangeRate: line.currencyExchangeRate,
          discount_rate: +line.discount_rate,
          item: line.item,
          // salesTotal:line.item.price * line.item.quantity,

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
    // return envoiceResponseDto
    const resss = await this.repo.find();

    return resss
  }

  async findOne(id: number): Promise<EnvoiceResponseDto> {
    const envoiceDb = await this.repo.findOneBy({ id: id });

    console.log(envoiceDb);
    const document: EnvoiceResponseDto = {
      issuer: {
        address: {
          branchID: envoiceDb.user.branch.code + '',
          country: envoiceDb.user.branch.address.country,
          governate: envoiceDb.user.branch.address.governerate,
          regionCity: envoiceDb.user.branch.address.regionCity,
          street: envoiceDb.user.branch.address.street,
          buildingNumber: envoiceDb.user.branch.address.buildingNumber,
          postalCode: envoiceDb.user.branch.address.postalCode,
          floor: envoiceDb.user.branch.address.floor,
          room: "0",
          landmark: envoiceDb.user.branch.address.landmark,
          additionalInformation: envoiceDb.user.branch.address.additionalInformation
        },
        type: envoiceDb.user.company.type,
        id: envoiceDb.user.company.taxNumber,
        name: envoiceDb.user.name
      },
      receiver: {
        address: {
          branchID: envoiceDb.client.branchId,
          country: envoiceDb.client.address.country,
          governate: envoiceDb.client.address.governerate,
          regionCity: envoiceDb.client.address.regionCity,
          street: envoiceDb.client.address.street,
          buildingNumber: envoiceDb.client.address.buildingNumber,
          postalCode: envoiceDb.client.address.postalCode,
          floor: envoiceDb.client.address.floor,
          room: "0",
          landmark: envoiceDb.user.branch.address.landmark,
          additionalInformation: envoiceDb.user.branch.address.additionalInformation
        },
        type: envoiceDb.client.type,
        id: envoiceDb.client.taxNumber,
        name: envoiceDb.client.name
      },
      documentType: envoiceDb.documentType,
      documentTypeVersion: envoiceDb.docTtotalDiscountAmount,
      dateTimeIssued: envoiceDb.createdAt,
      taxpayerActivityCode: envoiceDb.user.company.activity.code,
      internalID: envoiceDb.internalID,
      purchaseOrderReference: envoiceDb.purchaseOrderReference,
      purchaseOrderDescription: envoiceDb.purchaseOrderDescription,
      salesOrderReference: envoiceDb.salesOrderReference,
      salesOrderDescription: envoiceDb.salesOrderDescription,
      proformaInvoiceNumber: envoiceDb.proformaInvoiceNumber,
      payment: {
        bankName: "SomeValue",
        bankAddress: "SomeValue",
        bankAccountNo: "SomeValue",
        bankAccountIBAN: "",
        swiftCode: "",
        terms: "SomeValue",
      },
      delivery: {
        approach: "SomeValue",
        packaging: "SomeValue",
        dateValidity: "2022-03-28T09:30:10Z",
        exportPort: "SomeValue",
        countryOfOrigin: "EG",
        grossWeight: 10.5,
        netWeight: 20.5,
        terms: "SomeValue"
      },
      invoiceLines: envoiceDb.invoice_line.map(line => {
        return {
          description: line.item.name,
          itemType: ItemTypes.EGS,//[line.item.type],
          itemCode: line.item.code,
          unitType: line.item.unit,
          quantity: line.quantity,
          internalCode: line.internalCode,
          salesTotal: +line.item.price * line.quantity,
          netTotal: (+line.item.price * line.quantity) - (line.discount_rate * (+line.item.price * line.quantity)),
          total: ((+line.item.price * line.quantity) - (line.discount_rate * (+line.item.price * line.quantity))) + 9,
          //  line.taxbleItem.map(tax=>{
          // return {
          // t1-t4
          // }
          // }), // T1+T4
          valueDifference: 0,
          totalTaxableFees: 0,
          itemsDiscount: 0,
          unitValue: {
            currencySold: envoiceDb.currency,
            amountEGP: +line.item.price,
            amountSold: +line.item.price,
            currencyExchangeRate: 1
          },
          discount: {
            rate: line.discount_rate,
            amount: line.discount_rate * (+line.item.price * line.quantity)
          },
          taxableItems: line.taxbleItem.map(tax => {
            return {
              taxType: tax.taxType.code,
              amount: +tax.quantity,
              subType: tax.subTax.code,
              rate:+tax.rate
            }
          }),
        }as InvoicelineDto
      }),
      totalDiscountAmount: 0,
      totalSalesAmount: 0,
      netAmount: 0,
      taxTotals: [
        {
          taxType: "T1",
          amount: 0
        }
      ],
      totalAmount: 0,
      extraDiscountAmount: 0,
      totalItemsDiscountAmount: 0
    }

    return document;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // return this.repo.update(id, updateInvoiceDto)
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
