import { Module } from '@nestjs/common';
import { ChaosService } from './chaos.service';
import { ChaosController } from './chaos.controller';
import { ApiServiceFetcherService } from 'src/shared/api-service-fetcher/api-service-fetcher.service';

@Module({
  providers: [ChaosService, ApiServiceFetcherService],
  controllers: [ChaosController],
  exports: [ChaosService],
})
export class ChaosModule {}
