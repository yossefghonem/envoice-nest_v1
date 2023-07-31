
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { InvoiceLine } from "../entities/invoice-line.entity";
import { User } from "../entities/user.entity";
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

    @ApiPropertyOptional({ type: () => InvoiceLine.call })
    invoiceLine: InvoiceLine[];

    @ApiPropertyOptional({ type: () => User.call })
    user: User;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }
