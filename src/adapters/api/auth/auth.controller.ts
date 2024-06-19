import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ResponseHttp } from '../../../core/common/entity/response-http.model';
import { IloginManagamentUC, IlogoutManagamentUC } from '../../../core/auth/use-case';
import { LoginDto } from './dto/login.dto';
import { DuserContext } from '../../decorators/user-context.decorator';
import { IuserContext } from '../../../core/common/entity/user-context.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from '../../guard/jwt.guard';
import { Public } from '../../decorators/is-public.jwt.decorator';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(AuthJwtGuard)
export class AuthController {
  constructor(
    private loginUC: IloginManagamentUC,
    private logoutUC: IlogoutManagamentUC,
  ) {}

  @Post('login')
  @Public()
  async loginAccount(@Body() body: LoginDto) {
    const result = await this.loginUC.login(body);
    return new ResponseHttp(result.status, result);
  }

  @Post('logout')
  async logout(@DuserContext() user: IuserContext) {
    const result = await this.logoutUC.logout(user);
    return new ResponseHttp(result.status, result);
  }
}
