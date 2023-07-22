import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto, UpdatePermissionDto } from '../../dtos/permission.dto';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  create(@Body() permission: CreatePermissionDto) {
    return this.permissionService.create(permission)
  }

  @Get('All')
  findAll() {
    return this.permissionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return this.permissionService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.permissionService.remove(+id)
  }
}
