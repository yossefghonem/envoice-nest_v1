import { Module } from '@nestjs/common';
import { StaticService } from './static.service';
import { StaticController } from './static.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activities } from '../../entities/activity.entity';
import { GpcCode } from '../../entities/gpcCode.entity';
import { Units } from '../../entities/units.entity';
import { Tax } from '../../entities/tax-type.entity';
import { SubTax } from '../../entities/sub_tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activities, GpcCode, Units, Tax, SubTax])],
  controllers: [StaticController],
  providers: [StaticService],
  exports: [StaticService]
})
export class StaticModule { }
