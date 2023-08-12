import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from "../entities/user.entity";
import { Item } from 'src/entities/item.entity';
import { Tax } from 'src/entities/tax-type.entity';
import { SubTax } from 'src/entities/sub_tax.entity';
import { Client } from 'src/entities/client.entity';
export class TaxbleItemDto{
    @ApiProperty({})
    rate:string;
    @ApiProperty({})
    quantity:string;
    @ApiPropertyOptional({type:()=>Tax.call})
    taxType:Tax;
    @ApiPropertyOptional({type:()=>SubTax.call})
    subTax:SubTax;
}

export class LineDto {
    @ApiProperty()
    quantity?: string;

    @ApiProperty()
    price?: string;

    @ApiProperty()
    valueDifference?: string;

    @ApiProperty()
    totalTaxableFees?: string;

    @ApiProperty()
    itemsDiscount?: string;

    @ApiProperty({})
    currencyExchangeRate?: string;

    @ApiProperty()
    discount_rate?: string;

    @ApiPropertyOptional({ type: () => Item.call })
    item: Item;

    @ApiPropertyOptional({ type: [TaxbleItemDto] })
    taxbleItem: TaxbleItemDto[];
}

export class CreateInvoiceDto {
    @ApiProperty()
    documentType?: string;

    @ApiProperty()
    version?: string;

    @ApiProperty()
    docTtotalDiscountAmount?: string;

    @ApiProperty()
    totalSalesAmount: string;

    @ApiProperty()
    internalID: string;

    @ApiPropertyOptional({ type: () => User.call })
    user: User;
    
    @ApiPropertyOptional({ type: () => Client.call })
    client: Client;
    
    @ApiPropertyOptional({type:[LineDto]})
    invoiceLines: [LineDto];

}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }

export class InvoiceResponseDto{
    document:{
        issuer: {
            address: {
                branchID: "0",
                country: "EG",
                governate: "giza",
                regionCity: "october City",
                street: "الحصرى مجمع الميرلاند",
                buildingNumber: "115",
                postalCode: "1",
                floor: "1",
                room: "123",
                landmark: "7660 Melody Trail",
                additionalInformation: "beside Townhall"
            },
            type: "B",
            id: "209779519",
            name: "Issuer Company"
        };
        receiver: {
            address: {
                country: "EG",
                governate: "Egypt",
                regionCity: "اكتوبر",
                street: "ق 286 مخازن الشباب اكتوبر ",
                buildingNumber: "Bldg. 0",
                postalCode: "68030",
                floor: "1",
                room: "123",
                landmark: "7660 Melody Trail",
                additionalInformation: "beside Townhall"
            },
            type: "B",
            id: "543047296",
            name: "Receiver"
        };
        documentType: "I",
        documentTypeVersion: "1.0",
        dateTimeIssued: "2022-11-03T23:59:59Z",
        taxpayerActivityCode: "4510",
        internalID: "1200",
        purchaseOrderReference: "P-233-A6375",
        purchaseOrderDescription: "purchase Order description",
        salesOrderReference: "1231",
        salesOrderDescription: "Sales Order description",
        proformaInvoiceNumber: "SomeValue",
        payment: {
            bankName: "SomeValue",
            bankAddress: "SomeValue",
            bankAccountNo: "SomeValue",
            bankAccountIBAN: "",
            swiftCode: "",
            terms: "SomeValue"
        };
        delivery: {
            approach: "SomeValue",
            packaging: "SomeValue",
            dateValidity: "2022-03-28T09:30:10Z",
            exportPort: "SomeValue",
            countryOfOrigin: "EG",
            grossWeight: 10.5,
            netWeight: 20.5,
            terms: "SomeValue"
        };
        invoiceLines: [
            {
                description: "اسبوط ثابت 1010 اكسيد احمر سوبر لايت            ",
                itemType: "EGS",
                itemCode: "EG-209779519-41840",
                unitType: "EA",
                quantity: 5,
                internalCode: "IC0",
                salesTotal: 0,
                netTotal: 0,
                total: 0,
                valueDifference: 0,
                totalTaxableFees: 0,
                itemsDiscount: 0,
                unitValue: {
                    currencySold: "EUR",
                    amountEGP: 1,
                    amountSold: 1,
                    currencyExchangeRate: 1
                },
                discount: {
                    rate: 0,
                    amount: 0
                },
                taxableItems: [
                    {
                        taxType: "T1",
                        amount: 0,
                        subType: "sss",
                        rate: 14
                    }
                ]
            }
        ];
        totalDiscountAmount: 0,
        totalSalesAmount: 0,
        netAmount: 0,
        taxTotals: [
            {
                taxType: "T1",
                amount: 0
            }
        ];
        totalAmount: 0,
        extraDiscountAmount: 0,
        totalItemsDiscountAmount: 0
    }
}
