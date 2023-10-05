import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from 'src/entities/company.entity';

export class CreateGroupDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Company.call })
  company: Company;
}



export class UpdateGroupDto extends PartialType(CreateGroupDto) { }
