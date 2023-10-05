import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto, UpdateGroupDto } from '../../dtos/group.dto';
import { Role } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/userRole.enum';

@Controller('group')
@ApiTags('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Role([UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SUBUSER, UserRole.USER])
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: any) {
    return this.groupService.create(createGroupDto, req.user);
  }

  @Role([UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SUBUSER, UserRole.USER])
  @Get('all')
  findAll(@Req() req: any) {
    return this.groupService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
