import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { LaboratoryModule } from './modules/laboratory/laboratory.module';
import { FirebaseAuthStrategy } from './utils/strategies/firebase-auth.strategy';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PassportModule,
    DatabaseModule,
    LaboratoryModule,
  ],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
