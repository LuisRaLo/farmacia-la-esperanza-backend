import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoEstudiosEntity } from 'src/entities/catalogo_estudios.entity';
import { Repository } from 'typeorm';
import { LaboratoryReqDTO } from '../dto/LaboratorioReqDTO';
import { LaboratoryResDTO } from '../dto/LaboratorioResDTO';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(CatalogoEstudiosEntity)
    private readonly catalogoEstudiosRepository: Repository<CatalogoEstudiosEntity>,
  ) {}

  async findAll(): Promise<CatalogoEstudiosEntity[]> {
    return await this.catalogoEstudiosRepository.find();
  }

  async find(estudio: LaboratoryReqDTO): Promise<LaboratoryResDTO[]> {
    const tryFind = await this.catalogoEstudiosRepository.query(
      `SELECT * FROM catalogo_estudios WHERE nombre_estudio LIKE '%${estudio.nombre_estudio}%'`, 
    );

    const tryFindEstudios = tryFind.map(estudio => {
      return {
        id: estudio.id,
        nombre: estudio.nombre_estudio,
        muestraBiologica: estudio.muestra_biologica,
        entrega: estudio.entrega,
        precioVenta: estudio.precio_venta,
      };
    });

    return tryFindEstudios;
    
  }
  
}
