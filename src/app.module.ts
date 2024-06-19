import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { CommonsModule } from './commons/commons.module';
import { CoreModule } from './core/core.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [AdaptersModule, CommonsModule, CoreModule, DriversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
