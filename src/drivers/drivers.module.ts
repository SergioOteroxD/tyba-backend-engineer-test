import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Clients, ClientsDriver, IclientDriver } from './client';
import { IjwtDriver, JwtDriver } from './jwt';
import { IrestaurantDriver } from './restaurant/restaurant.driver';
import { RestaurantDriver } from './restaurant/impl/restaurant.driver.impl';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('general.SECRET_JWT'),
        signOptions: { expiresIn: config.get<string>('general.EXPIRES_JWT') },
        global: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.postgres.host'),
        port: config.get<number>('database.postgres.port'),
        username: config.get<string>('database.postgres.user'),
        password: config.get<string>('database.postgres.pw'),
        database: config.get<string>('database.postgres.db'),
        entities: [Clients],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Clients]),
  ],
  providers: [
    // Client
    { provide: IclientDriver, useClass: ClientsDriver },
    // Jwt
    { provide: IjwtDriver, useClass: JwtDriver },
    // Restaurant
    { provide: IrestaurantDriver, useClass: RestaurantDriver },
  ],
  exports: [IclientDriver, IjwtDriver, IrestaurantDriver],
})
export class DriversModule {}
