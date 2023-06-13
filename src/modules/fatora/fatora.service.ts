import { Injectable } from '@nestjs/common';
import { CreateFatoraDto } from './dto/create-fatora.dto';
import { UpdateFatoraDto } from './dto/update-fatora.dto';

@Injectable()
export class FatoraService {
  create(createFatoraDto: CreateFatoraDto) {
    return 'This action adds a new fatora';
  }

  findAll() {
    return `This action returns all fatora`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fatora`;
  }

  update(id: number, updateFatoraDto: UpdateFatoraDto) {
    return `This action updates a #${id} fatora`;
  }

  remove(id: number) {
    return `This action removes a #${id} fatora`;
  }
}
