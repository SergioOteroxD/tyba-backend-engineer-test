import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { EcollRoles } from '../../commons/enum/collaborator/collaborator-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<EcollRoles[]>(ROLES_KEY, context.getHandler()); //esto es para saber si tiene el decorador Roles
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAuth = roles.some((role) => role === user.rol);
    if (!isAuth) {
      throw new UnauthorizedException('you role is wrong');
    }
    return isAuth;
  }
}
