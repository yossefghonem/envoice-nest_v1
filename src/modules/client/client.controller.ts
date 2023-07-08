import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from '../../dtos/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get("all")
  getAll() {
    return this.clientService.getAll();
  }

  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.create(body);
  }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   console.log(id);
  //   return this.clientService.getOne(id)
  // }
}
