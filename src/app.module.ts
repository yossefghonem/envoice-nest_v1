import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { BranchModule } from './modules/branch/branch.module';
import { StaticModule } from './modules/static/static.module';
import { CompanyModule } from './modules/company/company.module';
import { FatoraModule } from './modules/fatora/fatora.module';
import { GroupModule } from './modules/group/group.module';
import { ItemModule } from './modules/item/item.module';
import { LicenseModule } from './modules/license/license.module';
const AllModules = [
  CompanyModule,
  RoleModule,
  AuthModule,
  PermissionModule,
  BranchModule,
  StaticModule,
  FatoraModule,
  GroupModule,
  ItemModule,
  LicenseModule,
  UserModule,
  ClientModule
];
@Module({
  imports: [
    ...AllModules,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
      // logger: 'advanced-console',
      // extra: {
      //   trustServerCertificate: true,
      // },
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
