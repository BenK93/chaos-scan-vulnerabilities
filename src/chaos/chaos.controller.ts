import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ChaosService } from './chaos.service';
import { ApiServiceFetcherService } from 'src/shared/api-service-fetcher/api-service-fetcher.service';

@Controller('chaos')
export class ChaosController {
  constructor(private readonly chaosService: ChaosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<any> {
    return await this.chaosService.findAll();
  }
}
