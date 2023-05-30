import { Controller, Get , Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAll() {
    return this.clientService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.clientService.getOne(id)
  }
}
