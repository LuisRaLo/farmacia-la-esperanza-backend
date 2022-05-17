import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryReqDTO } from '../dto/LaboratorioReqDTO';
import { LaboratoryResDTO } from '../dto/LaboratorioResDTO';
import { LaboratoryService } from '../services/laboratory.service';

@ApiTags('laboratorio')
@Controller(process.env.REST_ROUTE + '/laboratorio/estudios')
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Post()
  @ApiBody({ type: LaboratoryReqDTO })
  @ApiResponse({ status: 200, description: 'Laboratory created', type: LaboratoryResDTO })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async findEstudios(
    @Body() estudio: LaboratoryReqDTO,
  ): Promise<LaboratoryResDTO[]> {
    const tryFindEstudios = await this.laboratoryService.find(estudio);
    return tryFindEstudios;
  }
}
