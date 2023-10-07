import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from '../../dtos/client.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/userRole.enum';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Role([UserRole.USER])
  @Get('all')
  getAll(@Req() req: any) {
    return this.clientService.findAll(req.user);
  }

  @Role([UserRole.USER])
  @Post()
  create(@Body() body: CreateClientDto, @Req() req: any) {
    return this.clientService.create(body, req.user);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.clientService.findOne(+id);
  }

  // @Role([UserRole.USER])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateClientDto,
    @Req() req: any,
  ) {
    console.log(req.user);

    return this.clientService.update(+id, body, req.user);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
