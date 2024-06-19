import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from '../core/core.module';
import { ExceptionManager } from './lib/exceptions-manager.filter';
import { RequestHttpInterceptor } from './lib/request-http.interceptor';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './api/health.controller';
import { ClientController } from './api/client/client.controller';
import { ClientQueryController } from './api/client/client-query.controller';
import { AuthController } from './api/auth/auth.controller';
import { RestaurantController } from './api/restaurant/restaurant.controller';

@Module({
  imports: [CoreModule, TerminusModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionManager,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestHttpInterceptor,
    },
  ],
  controllers: [HealthController, ClientController, ClientQueryController, AuthController, RestaurantController],
})
export class AdaptersModule {}
