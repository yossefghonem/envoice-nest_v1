import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    name1: string;
    @ApiProperty()
    name2: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
export class LoginDto {
    @ApiProperty()
    taxNumber: string;

    @ApiProperty()
    password: string;
}

export class UpdateUserDto {
    @ApiProperty()
    taxNumber: string;
}
