import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import {
  CreateInvoiceDto,
  EnvoiceResponseDto,
  InvoicelineDto,
  UpdateInvoiceDto,
} from '../../dtos/invoice.dto';
import { InvoiceLine } from '../../entities/invoice-line.entity';
import { TaxbleItem } from 'src/entities/taxbleItems.entity';
import { ItemTypes } from '../../enums/itemTypes.enum';
import { JwtUser } from 'src/guards/jwt.strategy';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private readonly repo: Repository<Invoice>,
  ) {}

  submitDocument(id: number, user: any) {
    console.log(id, user);
    // throw new Error('Method not implemented.');
  }
  /*
  valueDifference
  totalTaxableFees
  itemsDiscount
  */
  async create(invoiceDto: CreateInvoiceDto, user: JwtUser) {
    console.log('====================================');
    console.log(invoiceDto);
    console.log('====================================');

    const newInvoice: Invoice = {
      documentType: invoiceDto.documentType,
      version: invoiceDto.version,
      company: { id: +user.companyId },
      // docTtotalDiscountAmount: invoiceDto.docTtotalDiscountAmount,
      totalSalesAmount: invoiceDto.totalSalesAmount || 0,
      internalId: invoiceDto.internalId || '1',
      purchaseOrderReference: invoiceDto.purchaseOrderReference,
      purchaseOrderDescription: invoiceDto.purchaseOrderDescription,
      salesOrderReference: invoiceDto.salesOrderReference,
      salesOrderDescription: invoiceDto.salesOrderDescription,
      proformaInvoiceNumber: invoiceDto.proformaInvoiceNumber,
      user: { id: +user.id },
      client: { id: +invoiceDto.client },
      invoice_line: invoiceDto.lines.map((line) => {
        const salesTotal = line.price * line.quantity;
        const discountA = (line.discoundRate || 0) * salesTotal;
        return {
          salesTotal: salesTotal,
          discount_amount: discountA,
          quantity: line.quantity,
          price: line.price,
          valueDifference: line.valueDifference || 0,
          totalTaxableFees: line.totalTaxableFees || 0,
          itemDiscound: line.discoundRate || 0,
          currencyExchangeRate: line.currencyExchangeRate || 0,
          discoundRate: line.discoundRate, // rate
          item: line.itemId,
          netTotal: salesTotal - discountA,
          taxbleItem: line.taxbleItem.map((tax) => {
            return {
              amount: tax.rate * (salesTotal - discountA),
              rate: tax.rate,
              taxType: tax.taxId,
              subTax: tax.subTaxId,
            } as TaxbleItem;
          }),
        } as InvoiceLine;
      }),
    };
    console.log(newInvoice);

    return await this.repo.save(newInvoice);
  }

  async findAll(user: JwtUser) {
    // const resss = await this.repo.find();
    // return resss
    return this.repo
      .createQueryBuilder('i')
      .leftJoin('i.user', 'user')
      .leftJoin('i.client', 'client')
      .leftJoin('i.company', 'comp')
      .leftJoin('user.branch', 'branch')
      .leftJoin('branch.address', 'address')
      .leftJoin('address.country', 'country')
      .where('comp.id = :id', { id: +user.companyId })
      .select([
        'i.createdAt',
        'client.name',
        'user.id',
        'branch.id',
        'branch.name_en',
        'client.taxNumber',
        'country.desc_ar',
        'i.totalSalesAmount',
        'i.totalSalesAmount',
        'i.totalSalesAmount',
        'i.totalSalesAmount',
        'i.id',
        'i.uuid',
        'i.status',
        'country.id',
        'address.id',
        'i.internalId',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<EnvoiceResponseDto> {
    const envoiceDb = await this.repo.findOneBy({ id: id });

    // console.log("222222",envoiceDb.invoice_line[0].taxbleItem);
    const totalDiscountAmount = envoiceDb.invoice_line
      .map((line) => +line.discount_amount)
      .reduce((acc, line) => acc + line, 0);
    console.log('tttt', totalDiscountAmount);

    const totalSalesAmount = envoiceDb.invoice_line
      .map((line) => +line.salesTotal)
      .reduce((acc, line) => acc + line, 0);
    const totals = envoiceDb.invoice_line.map((line) => {
      const netTotal = +line.netTotal;
      const amount_t1: number =
        line.taxbleItem
          .filter((entry) => entry.taxType.code === 'T1')
          .map((entry) => +entry.amount)[0] || 0;
      const amount_t4: number =
        line.taxbleItem
          .filter((entry) => entry.taxType.code === 'T4')
          .map((entry) => +entry.amount)[0] || 0;
      return { netTotal, amountT1: amount_t1, amountT4: amount_t4 };
    });
    const totalAmountT1 = totals.reduce((acc, line) => acc + line.amountT1, 0);
    const totalAmountT4 = totals.reduce((acc, line) => acc + line.amountT4, 0);
    const totalNetTotal = totals.reduce((acc, line) => acc + line.netTotal, 0);

    // .reduce((acc, line) => acc + line, 0);

    const document: EnvoiceResponseDto = {
      issuer: {
        address: {
          branchID: envoiceDb.user?.branch?.code || '0',
          country: envoiceDb.user.branch.address.country.code,
          governate: envoiceDb.user.branch.address.governerate,
          regionCity: envoiceDb.user.branch.address.regionCity,
          street: envoiceDb.user.branch.address.street,
          buildingNumber: envoiceDb.user.branch.address.buildingNumber,
          postalCode: envoiceDb.user.branch.address.postalCode,
          floor: envoiceDb.user.branch.address.floor,
          room: '0',
          landmark: envoiceDb.user.branch.address.landmark,
          additionalInformation:
            envoiceDb.user.branch.address.additionalInformation,
        },
        type: envoiceDb.user.company.type,
        id: envoiceDb.user.company.taxNumber,
        name: envoiceDb.user.company.name,
      },
      receiver: {
        address: {
          branchID: envoiceDb.client.branchId,
          country: envoiceDb.client.address.country.code,
          governate: envoiceDb.client.address.governerate,
          regionCity: envoiceDb.client.address.regionCity,
          street: envoiceDb.client.address.street,
          buildingNumber: envoiceDb.client.address.buildingNumber,
          postalCode: envoiceDb.client.address.postalCode,
          floor: envoiceDb.client.address.floor,
          room: '0',
          landmark: envoiceDb.user.branch.address.landmark,
          additionalInformation:
            envoiceDb.user.branch.address.additionalInformation,
        },
        type: envoiceDb.client.type,
        id: envoiceDb?.client?.taxNumber,
        name: envoiceDb.client.name,
      },
      documentType: envoiceDb.documentType,
      documentTypeVersion: envoiceDb.version,
      dateTimeIssued: new Date().toISOString().slice(0, -5) + 'Z',
      taxpayerActivityCode: envoiceDb.user.company.activity.code,
      internalID: envoiceDb.internalId,
      purchaseOrderReference: envoiceDb.purchaseOrderReference,
      purchaseOrderDescription: envoiceDb.purchaseOrderDescription,
      salesOrderReference: envoiceDb.salesOrderReference,
      salesOrderDescription: envoiceDb.salesOrderDescription,
      proformaInvoiceNumber: envoiceDb.proformaInvoiceNumber,
      payment: {
        bankName: 'SomeValue',
        bankAddress: 'SomeValue',
        bankAccountNo: 'SomeValue',
        bankAccountIBAN: '',
        swiftCode: '',
        terms: 'SomeValue',
      },
      delivery: {
        approach: 'SomeValue',
        packaging: 'SomeValue',
        dateValidity: '2022-03-28T09:30:10Z',
        exportPort: 'SomeValue',
        countryOfOrigin: 'EG',
        grossWeight: 10.5,
        netWeight: 20.5,
        terms: 'SomeValue',
      },
      invoiceLines: envoiceDb.invoice_line.map((line) => {
        const amount_of_t1: number =
          line.taxbleItem
            .filter((entry) => entry.taxType.code === 'T1')
            .map((entry) => entry.amount)[0] || 0;
        const amount_of_t4: number =
          line.taxbleItem
            .filter((entry) => entry.taxType.code === 'T4')
            .map((entry) => entry.amount)[0] || 0;

        return {
          description: line.item.name,
          itemType: ItemTypes[line.item.type],
          itemCode: line.item.code,
          unitType: line.item.unit,
          quantity: +line.quantity,
          internalCode: line.internalCode,
          salesTotal: +line.salesTotal,
          netTotal: line.salesTotal - line.discount_amount,
          total: +line.netTotal + +amount_of_t1 - +amount_of_t4,
          valueDifference: 0,
          totalTaxableFees: 0,
          itemsDiscount: 0,
          unitValue: {
            currencySold: 'EGP',
            // envoiceDb.currency,
            amountEGP: +line.price,
            // amountSold: 0,
            // currencyExchangeRate: 1
          },
          discount: {
            rate: +line.discoundRate,
            amount: +line.discoundRate * (+line.item.price * line.quantity),
          },
          taxableItems: line.taxbleItem.map((tax) => {
            return {
              taxType: tax.taxType.code,
              amount: +tax.amount,
              subType: tax.subTax.code,
              rate: Math.round(+tax.rate * 100),
            };
          }),
        } as InvoicelineDto;
      }),
      totalDiscountAmount: totalDiscountAmount,
      totalSalesAmount: totalSalesAmount,
      netAmount: totalSalesAmount - totalDiscountAmount,
      taxTotals: [
        {
          taxType: 'T1',
          amount: +totalAmountT1.toFixed(2),
        },
        {
          taxType: 'T4',
          amount: +totalAmountT4.toFixed(2),
        },
      ],
      totalAmount: +(totalNetTotal + totalAmountT1 - totalAmountT4).toFixed(2),
      extraDiscountAmount: 0,
      totalItemsDiscountAmount: 0,
    };

    return document;
    // call integration
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // return this.repo.update(id, updateInvoiceDto)
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
