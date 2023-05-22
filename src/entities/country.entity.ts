import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty } from '@nestjs/swagger';

export type CountryDocument = Country & Document;


@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Country extends OBaseEntity {

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
export const CountrySchema = SchemaFactory.createForClass(Country);
