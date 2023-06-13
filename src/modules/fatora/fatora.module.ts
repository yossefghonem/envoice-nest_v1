import { Module } from '@nestjs/common';
import { FatoraService } from './fatora.service';
import { FatoraController } from './fatora.controller';

@Module({
  controllers: [FatoraController],
  providers: [FatoraService]
})
export class FatoraModule {}
