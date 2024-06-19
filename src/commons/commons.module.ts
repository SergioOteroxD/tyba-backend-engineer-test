import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import generalConfig from './config/general.config';
import clientConfig from './config/client.config';
import databaseConfig from './config/database.config';
import apisConfig from './config/apis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [generalConfig, clientConfig, databaseConfig, apisConfig],
      expandVariables: true,
    }),
  ],
})
export class CommonsModule {}
