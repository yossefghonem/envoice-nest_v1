import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from '../../dtos/client.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('client')
@ApiTags("Client")
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get("all")
  getAll() {
    return this.clientService.findAll();
  }

  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.create(body);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.clientService.findOne(+id)
  }
}
