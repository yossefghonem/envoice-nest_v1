import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports:[
    HttpModule,InvoiceModule,
    CacheModule.register({
      ttl:3600000 // 1h
    }),
  ],
  controllers: [IntegrationController],
  providers: [IntegrationService]
})
export class IntegrationModule {}
