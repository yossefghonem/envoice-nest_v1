
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { InvoiceLine } from "../entities/invoice-line.entity";
import { User } from "../entities/user.entity";
import { TaxbleItem } from "../entities/taxbleItems.entity";
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

    @ApiPropertyOptional({ type: () => InvoiceLine })
    invoiceLine: InvoiceLine[];

    // @ApiPropertyOptional({ type: () => TaxbleItem.call })
    // taxs: TaxbleItem[];

    @ApiPropertyOptional({ type: () => User.call })
    user: User;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }
