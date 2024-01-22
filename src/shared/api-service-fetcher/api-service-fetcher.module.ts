import { Module } from '@nestjs/common';
import { ApiServiceFetcherService } from './api-service-fetcher.service';

@Module({
  providers: [ApiServiceFetcherService],
  exports: [ApiServiceFetcherService],
})
export class ApiServiceFetcherModule {}
