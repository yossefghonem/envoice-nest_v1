import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty({})
    name?: string;

    @ApiProperty({})
    taxNumber?: string;

    @ApiProperty({})
    certificate?: string;

    @ApiProperty({})
    activity?: string;

    @ApiProperty({})
    clientId: string;

    @ApiProperty({})
    clientSecret1?: string;

    @ApiProperty({})
    clientSecret2?: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) { }