import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catalogo_estudios')
export class CatalogoEstudiosEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  nombre_estudio: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  muestra_biologica: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  entrega: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  precio_compra: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  precio_venta: string;
}
