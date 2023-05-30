import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';
import { ConfigModule } from '@nestjs/config';
const allModules= [UserModule, ClientModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.mongodb),
    ...allModules,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



