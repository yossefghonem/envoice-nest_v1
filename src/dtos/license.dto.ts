import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateLicenseDto {

    @ApiProperty({})
    startDate: Date;

    @ApiProperty({})
    endDate: Date;

    @ApiProperty({})
    userId: string;
}

export class UpdateLicenseDto extends PartialType(CreateLicenseDto) { }
