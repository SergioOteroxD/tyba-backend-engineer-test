import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ResponseHttp } from '../../../core/common/entity/response-http.model';
import { IuserContext } from '../../../core/common/entity/user-context.interface';
import { IregisterClientUC, IupdateClientUC } from 'src/core/client';
import { AuthJwtGuard } from '../../guard/jwt.guard';
import { DuserContext } from 'src/adapters/decorators/user-context.decorator';
import { RegisterClientDto } from './dto/register-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Public } from '../../decorators/is-public.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(AuthJwtGuard)
export class ClientController {
  constructor(
    private registerClient: IregisterClientUC,
    private updateClientUC: IupdateClientUC,
  ) {}

  @Post('register')
  @Public()
  async registerAssociate(@Body() body: RegisterClientDto) {
    const result = await this.registerClient.create(body);
    return new ResponseHttp(result.status, result);
  }

  @Patch(':clientId/update')
  async updateInfoAssociate(@Body() body: UpdateClientDto, @Param('clientId') clientId: string, @DuserContext() user: IuserContext) {
    const result = await this.updateClientUC.update(user, clientId, body);
    return new ResponseHttp(result.status, result);
  }
}
