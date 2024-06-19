import { SetMetadata } from '@nestjs/common';
import { EcollRoles } from 'src/commons/enum/collaborator/collaborator-roles.enum';

export const ROLES_KEY = 'roles';

export const Droles = (...roles: EcollRoles[]) => SetMetadata(ROLES_KEY, roles);
