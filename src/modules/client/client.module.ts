import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // sql module// mongo

  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule { }
