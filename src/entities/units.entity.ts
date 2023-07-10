// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { OBaseEntity } from './OBaseEntity';
// import { ApiProperty } from '@nestjs/swagger';
// import { UserRole } from '../enums/userRole.enum';
// import * as bcrypt from 'bcrypt';
// import { UserType } from '../enums/userType.enum';

import { Column, Entity } from "typeorm";
import { OBaseEntity } from "./OBaseEntity";
import { ApiProperty } from "@nestjs/swagger";

// export type UnitDocument = Unit & Document;

// @Schema({
//     autoIndex: true,
//     timestamps: {
//         createdAt: 'createdAt',
//         updatedAt: 'updatedAt',
//     },
// })
// export class Unit extends OBaseEntity {
//     @ApiProperty()
//     @Prop({})
//     code: string;

//     @ApiProperty()
//     @Prop({})
//     desc_en: string;

//     @ApiProperty()
//     @Prop({})
//     desc_er: string;
// }
// export const UnitSchema = SchemaFactory.createForClass(Unit);

@Entity()
export class Units extends OBaseEntity {
    @ApiProperty()
    @Column()
    code?: string;

    @ApiProperty()
    @Column()
    desc_en?: string;

    @ApiProperty()
    @Column({ nullable: true })
    desc_er?: string;
}