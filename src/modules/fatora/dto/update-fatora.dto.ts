import { PartialType } from '@nestjs/swagger';
import { CreateFatoraDto } from './create-fatora.dto';

export class UpdateFatoraDto extends PartialType(CreateFatoraDto) {}
