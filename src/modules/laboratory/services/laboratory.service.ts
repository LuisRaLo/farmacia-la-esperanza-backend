import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoEstudiosEntity } from 'src/entities/catalogo_estudios.entity';
import { Repository } from 'typeorm';
import { LaboratoryReqDTO } from '../dto/LaboratorioReqDTO';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(CatalogoEstudiosEntity)
    private readonly catalogoEstudiosRepository: Repository<CatalogoEstudiosEntity>,
  ) {}

  async findAll(): Promise<CatalogoEstudiosEntity[]> {
    return await this.catalogoEstudiosRepository.find();
  }

  async find(estudio: LaboratoryReqDTO): Promise<CatalogoEstudiosEntity[]> {
    return await this.catalogoEstudiosRepository.find(estudio);
  }
}
