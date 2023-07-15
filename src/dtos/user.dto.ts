import { Company } from './../entities/company.entity';
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    clientId: string;

    @ApiProperty()
    clientSecret1: string;

    @ApiProperty()
    clientSecret2: string;

    @ApiProperty()
    company: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    branch: string;
}

export class LoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
