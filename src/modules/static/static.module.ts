import { Module } from '@nestjs/common';
import { StaticService } from './static.service';
import { StaticController } from './static.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activities } from '../../entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activities])],
  controllers: [StaticController],
  providers: [StaticService]
})
export class StaticModule { }
