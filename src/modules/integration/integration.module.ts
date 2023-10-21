import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [HttpModule, InvoiceModule],
  controllers: [IntegrationController],
  providers: [IntegrationService],
  exports: [IntegrationService],
})
export class IntegrationModule {}
