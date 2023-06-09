import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../../entities/branch.entity';
import { Address } from '../../entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Address])],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule { }
