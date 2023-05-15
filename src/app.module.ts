import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';

const allModules= [UserModule, ClientModule];
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/envoices'),
    ...allModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



