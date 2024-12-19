import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuService } from '../service/menu.service';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('')
    createMenu(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.createMenu(createMenuDto);
    }

    @Get()
    findAll() {
      return this.menuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.menuService.findMenu(+id);
    }

    @Patch(':id')
    updateMenu(@Param('id', ParseIntPipe) id: number,@Body() updateMenuDto: UpdateMenuDto,) {
        return this.menuService.updateMenu(+id ,updateMenuDto);
    }

    @Delete(':id')
    deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(+id);
    }
}