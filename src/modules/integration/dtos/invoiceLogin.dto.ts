import { ApiProperty } from "@nestjs/swagger";

export class InvoiceLoginDto{
    @ApiProperty({})
    client_id:string;
    @ApiProperty({})
    client_secret:string;
}