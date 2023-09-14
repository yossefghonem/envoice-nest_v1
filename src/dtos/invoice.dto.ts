import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Item } from 'src/entities/item.entity';
import { Tax } from 'src/entities/tax-type.entity';
import { SubTax } from 'src/entities/sub_tax.entity';
import { Client } from 'src/entities/client.entity';
export class TaxbleItemDto {
  @ApiProperty({})
  rate: number;
  @ApiPropertyOptional({ type: () => Tax.call })
  taxId: Tax;
  @ApiPropertyOptional({ type: () => SubTax.call })
  subTaxId: SubTax;
}

export class LineDto {
  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  valueDifference?: number;

  @ApiProperty()
  totalTaxableFees?: number;

  @ApiProperty({})
  currencyExchangeRate?: number;

  @ApiProperty()
  discoundRate?: number;

  @ApiProperty()
  rate?: number;

  @ApiPropertyOptional({ type: () => Item.call })
  itemId: Item;

  @ApiPropertyOptional({ type: [TaxbleItemDto] })
  taxbleItem: TaxbleItemDto[];
}

export class CreateInvoiceDto {
  @ApiProperty()
  documentType?: string;

  @ApiProperty()
  version?: string;

  @ApiProperty()
  docTtotalDiscountAmount?: number;

  @ApiProperty()
  totalSalesAmount: number;

  @ApiProperty()
  internalID: string;

  @ApiProperty()
  purchaseOrderReference: string;

  @ApiProperty()
  purchaseOrderDescription: string;

  @ApiProperty()
  salesOrderReference: string;

  @ApiProperty()
  salesOrderDescription: string;

  @ApiProperty()
  proformaInvoiceNumber: string

  @ApiPropertyOptional({ type: () => User.call })
  user: User;

  @ApiPropertyOptional({ type: () => Client.call })
  client: Client;

  @ApiPropertyOptional({ type: [LineDto] })
  lines: [LineDto];


  @ApiProperty(
    // required:false
  )
  status: string

}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }

export class AddressDto {
  branchID: string;
  country: string;
  governate: string;
  regionCity: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
  floor: string;
  room: string;
  landmark: string;
  additionalInformation: string;
}

export class IssuerDto {
  address: AddressDto;
  type: string;
  id: string;
  name: string;
}

export class PaymentDto {
  bankName: string;
  bankAddress: string;
  bankAccountNo: string;
  bankAccountIBAN: string
  swiftCode: string
  terms: string
};
export class DeliveryDto {
  approach: string;
  packaging: string;
  dateValidity: string;
  exportPort: string;
  countryOfOrigin: string;
  grossWeight: number;
  netWeight: number;
  terms: string;
};

export class UnitValueDto {
  currencySold: string;
  amountEGP: number;
  amountSold: number;
  currencyExchangeRate: number;
}

export class DiscountDto {
  rate: number;
  amount: number;
}

export class InvoicelineDto {
  price: number;
  description: string;
  itemType: string
  itemCode: string
  unitType: string
  quantity: number
  internalCode: string
  salesTotal: number
  netTotal: number
  total: number
  valueDifference: number
  totalTaxableFees: number
  itemsDiscount: number
  unitValue: UnitValueDto
  discount: DiscountDto
  taxableItems: [
    {
      taxType: string,
      amount: number,
      subType: string,
      rate: number
    }
  ]
}
export class TaxTotalsDto {

  taxType: string
  amount: number
}
export class EnvoiceResponseDto {
  issuer: IssuerDto;
  receiver: IssuerDto;
  documentType: string;
  documentTypeVersion: string;
  dateTimeIssued: string;
  taxpayerActivityCode: string;
  internalID: string;
  purchaseOrderReference: string
  purchaseOrderDescription: string;
  salesOrderReference: string;
  salesOrderDescription: string;
  proformaInvoiceNumber: string;
  payment: PaymentDto;
  delivery: DeliveryDto;
  invoiceLines: InvoicelineDto[];
  totalDiscountAmount: number;
  totalSalesAmount: number;
  netAmount: number;
  taxTotals: TaxTotalsDto[];
  totalAmount: number;
  extraDiscountAmount: number;
  totalItemsDiscountAmount: number
}
