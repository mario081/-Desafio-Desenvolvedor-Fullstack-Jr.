import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FeatureModule } from 'src/feature/feature.module';
import { AnimalModule } from 'src/animal/animal.module';


@Module({
  imports: [AnimalModule, UserModule, PrismaModule, FeatureModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
