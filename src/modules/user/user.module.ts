import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Activities } from '../../entities/activity.entity';
import { StaticModule } from '../static/static.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Activities]),
    RoleModule
    , StaticModule
    , CompanyModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
