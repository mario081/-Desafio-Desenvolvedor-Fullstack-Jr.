import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosAutomaticosModule } from 'src/conceitos-automaticos/conceitos-automaticos.module';

@Module({
  imports: [ConceitosAutomaticosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
