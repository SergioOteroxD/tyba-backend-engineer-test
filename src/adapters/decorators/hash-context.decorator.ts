import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const DhashContext = createParamDecorator((required: boolean, ctx: ExecutionContext): string => {
  try {
    const request = ctx.switchToHttp().getRequest();
    const hash: string = request.headers['hash'];

    if (!hash) throw new Error('Asegúrese de indicar datos válidos de solicitante.');

    return hash;
  } catch {
    throw new ForbiddenException('Asegúrese de indicar datos válidos de solicitante.');
  }
});
