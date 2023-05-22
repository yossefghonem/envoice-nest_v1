import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'mongoose';

export class OBaseEntity extends Model<any> {
  _id?: any;

  @Prop({})
  // @ApiProperty({})
  createdAt?: number;
  // @ApiProperty()
  @Prop({})
  // @ApiProperty({})
  updatedAt?: number;
}
