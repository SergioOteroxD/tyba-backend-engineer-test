import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, TypeOrmHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { ResponseBase } from 'src/core/common/entity/response-base.model';
import { ResponseHttp } from 'src/core/common/entity/response-http.model';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HttpCode(200)
  @HealthCheck()
  async check() {
    const result = await this.health.check([async () => this.db.pingCheck('database')]);
    console.log('🚀 ~ HealthController ~ check ~ result:', result);
    return new ResponseHttp(200, new ResponseBase({ code: 'ok', message: 'ok', status: 200 }, result));
  }
}
