import { Module } from '@nestjs/common';
import { LaboratoryService } from './services/laboratory.service';
import { LaboratoryController } from './controllers/laboratory.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CatalogoEstudiosEntity } from 'src/entities/catalogo_estudios.entity';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CatalogoEstudiosEntity]),
    PassportModule,
  ],
  providers: [JwtStrategy, LaboratoryService],
  controllers: [LaboratoryController],
})
export class LaboratoryModule {}
