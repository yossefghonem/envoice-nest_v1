import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Activities } from '../../entities/activity.entity';
import { StaticModule } from '../static/static.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Activities]),
    RoleModule
    , StaticModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
