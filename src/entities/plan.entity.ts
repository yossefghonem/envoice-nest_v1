import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/userRole.enum';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/userType.enum';

export type ActivitiesDocument = Activities & Document;


@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Activities extends OBaseEntity {

    @ApiProperty()
    @Prop({})
    code: string;

    @ApiProperty()
    @Prop({})
    desc_en: string;

    @ApiProperty()
    @Prop({})
    desc_er: string;
}
export const ActivitiesSchema = SchemaFactory.createForClass(Activities);
