import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryReqDTO } from '../dto/LaboratorioReqDTO';
import { LaboratoryResDTO } from '../dto/LaboratorioResDTO';
import { LaboratoryService } from '../services/laboratory.service';

@ApiTags('laboratorio')
@Controller(process.env.REST_ROUTE + '/laboratorio/estudios')
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Laboratory created',
    type: LaboratoryResDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getAllEstudios(
    @Res() res,
    @Body() payload: LaboratoryReqDTO,
  ): Promise<any> {
    const result = await this.laboratoryService.searchAll(payload);
    return res.status(200).json(result);
  }

  @Post('/tkn')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async helloWorld(): Promise<string> {
    return 'Hello World!';
  }
}
