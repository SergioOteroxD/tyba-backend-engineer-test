import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.jwt.decorator';
import { GeneralUtils } from '../../commons/utils/general.util';
import { IjwtUC } from '../../core/jwt/use_case/jwt.uc';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private jwtService: IjwtUC,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = GeneralUtils.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Recuerda enviar el token de session.');
    }
    try {
      const payload = await this.jwtService.verify(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Recuerda enviar el token de session.');
    }
    return true;
  }
}
