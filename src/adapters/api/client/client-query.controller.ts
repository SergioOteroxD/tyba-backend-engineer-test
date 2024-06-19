import { BadRequestException, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ResponseHttp, IresponseHttp } from '../../../core/common/entity/response-http.model';
import { AuthJwtGuard } from '../../guard/jwt.guard';
import { IqueryClientUC } from '../../../core/client/use-case/query-client.uc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(AuthJwtGuard)
export class ClientQueryController {
  constructor(private query: IqueryClientUC) {}
  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('code') code: string,
    @Query('status') status: string,
  ) {
    if (page < 1 || limit < 1) throw new BadRequestException('Los valores de paginación no son válidos.');

    const result = await this.query.getAll(page, limit, { name, code, status }, undefined);

    return new ResponseHttp(result.status, result);
  }

  @Get(':clientId')
  async getUserById(@Param('clientId') clientId: string): Promise<IresponseHttp> {
    const result = await this.query.getById(clientId);

    return new ResponseHttp(result.status, result);
  }
}
