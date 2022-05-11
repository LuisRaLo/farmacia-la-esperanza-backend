import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LaboratoryReqDTO {
  @ApiProperty({
    description: 'Nombre del estudio',
    required: true,
    example: 'Estudio de prueba',
  })
  @IsString()
  @MinLength(3)
  nombre_estudio: string;
}
