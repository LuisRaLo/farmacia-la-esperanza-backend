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

  //SEARCH ALL COINCIDENCES
  public async searchAll(
    payload: LaboratoryReqDTO,
  ): Promise<LaboratoryResDTO | LaboratoryResDTO[]> {
    const { nombre_estudio } = payload;
    const data: any = this.catalogoEstudiosRepository.query(
      `SELECT * FROM catalogo_estudios WHERE nombre_estudio LIKE '%${nombre_estudio}%'`,
    );

    const result: CatalogoEstudiosEntity[] = await data;

    if (result.length > 0) {
      return result.map((item) => {
        return {
          idEstudio: item.id,
          nombre: item.nombre_estudio,
          muestraBiologica: item.muestra_biologica,
          entrega: item.entrega,
          precioCompra: item.precio_compra,
          precioVenta: item.precio_venta,
        };
      });
    }

    return {
      idEstudio: 0,
      nombre: '',
      muestraBiologica: '',
      entrega: '',
      precioCompra: '',
      precioVenta: '',
    };
  }
  
}
