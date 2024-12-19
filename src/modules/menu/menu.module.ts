import { Module } from '@nestjs/common';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './service/menu.service';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}