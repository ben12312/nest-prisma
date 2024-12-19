import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [CoreModule,MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
