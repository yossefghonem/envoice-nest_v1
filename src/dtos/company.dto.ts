import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty({})
    name?: string;

    @ApiProperty({})
    taxNumber?: string;

    @ApiProperty({})
    certificate?: string;

    @ApiProperty({})
    activityCode?: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) { }