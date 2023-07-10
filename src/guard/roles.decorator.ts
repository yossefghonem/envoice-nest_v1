import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../enums/userRole.enum';

export function Role(role: UserRole[]) {
    return applyDecorators(
        SetMetadata('roles', role),
        UseGuards(RolesGuard),
    );
}
// applyDecorators();
