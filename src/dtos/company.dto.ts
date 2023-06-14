import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty({})
    name?: string;

    @ApiProperty({})
    certificate?: string;

    @ApiProperty({})
    activity: string;
}
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) { }