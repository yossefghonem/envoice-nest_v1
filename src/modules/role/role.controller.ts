import { JwtAuthGuard } from './../../guards/jwt.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';

@Controller('roles')
@ApiTags("Roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }

  @Get("all")
  async findAll(@Req() req: any) {
   return await this.roleService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() role: UpdateRoleDto) {
    return this.roleService.update(+id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
