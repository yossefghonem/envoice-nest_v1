import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags("Roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
}
