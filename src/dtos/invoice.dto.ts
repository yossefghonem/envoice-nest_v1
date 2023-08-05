import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from "../entities/user.entity";
import { Item } from 'src/entities/item.entity';
import { Tax } from 'src/entities/tax-type.entity';
import { SubTax } from 'src/entities/sub_tax.entity';
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
    salesTotal?: string;

    @ApiProperty()
    total?: string;

    @ApiProperty()
    valueDifference?: string;

    @ApiProperty()
    totalTaxableFees?: string;

    @ApiProperty()
    netTotal?: string;

    @ApiProperty()
    itemsDiscount?: string;

    @ApiProperty({})
    currencyExchangeRate?: string;

    @ApiProperty()
    discount_rate?: string;

    @ApiProperty()
    discount_amount?: string;

    @ApiProperty()
    internalCode: string;

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
    netAmount?: string;

    @ApiProperty()
    internalID: string;

    @ApiPropertyOptional({type:[LineDto]})
    invoiceLines: [LineDto];

    @ApiPropertyOptional({ type: () => User.call })
    user: User;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }
