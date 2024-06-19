import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import { IqueryClientUC, IregisterClientUC, IupdateClientUC, QueryClientUC, RegisterClientUC, UpdateClientUC } from './client';
import { IjwtUC } from './jwt/use_case/jwt.uc';
import { JwtUC } from './jwt/use_case/impl/jwt.uc.impl';
import { GenerateAdminSessionUC, IgenerateAdminSessionUC, IloginManagamentUC, IlogoutManagamentUC, LoginManagementUC, LogoutManagementUC } from './auth/use-case';
import { IqueryRestaurantUC } from './restaurant/use-case/query-restaurant.uc';
import { QueryRestaurantUC } from './restaurant/use-case/impl/query-restaurant.uc.impl';

@Module({
  imports: [DriversModule],
  providers: [
    // Client
    { provide: IregisterClientUC, useClass: RegisterClientUC },
    { provide: IupdateClientUC, useClass: UpdateClientUC },
    { provide: IqueryClientUC, useClass: QueryClientUC },
    // Auth
    { provide: IloginManagamentUC, useClass: LoginManagementUC },
    { provide: IlogoutManagamentUC, useClass: LogoutManagementUC },
    { provide: IgenerateAdminSessionUC, useClass: GenerateAdminSessionUC },
    // Restaurant
    { provide: IqueryRestaurantUC, useClass: QueryRestaurantUC },
    // Jwt
    { provide: IjwtUC, useClass: JwtUC },
  ],
  exports: [IregisterClientUC, IupdateClientUC, IqueryClientUC, IjwtUC, IloginManagamentUC, IlogoutManagamentUC, IqueryRestaurantUC],
})
export class CoreModule {}
