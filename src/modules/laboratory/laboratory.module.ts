import { Module } from '@nestjs/common';
import { LaboratoryService } from './services/laboratory.service';
import { LaboratoryController } from './controllers/laboratory.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEstudiosEntity } from 'src/entities/catalogo_estudios.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CatalogoEstudiosEntity])],
  providers: [LaboratoryService],
  controllers: [LaboratoryController],
})
export class LaboratoryModule {}
