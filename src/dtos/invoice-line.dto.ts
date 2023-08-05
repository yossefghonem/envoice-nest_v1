
import { TaxbleItem } from 'src/entities/taxbleItems.entity';
import { Item } from '../entities/item.entity';

import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateLineDto {
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

    @ApiPropertyOptional({ type: [TaxbleItem] })
    taxbleItem: TaxbleItem[];
}

export class UpdateLineDto extends PartialType(CreateLineDto) { }
