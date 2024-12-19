import { HttpException, Injectable } from '@nestjs/common';
import { User, Menu } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) { }

    async createMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
        try {
            let parent = createMenuDto.parent;
            const newMenu = await this.prisma.menu.create({
                data: {
                    name: createMenuDto.name,
                },
            });
            if (parent) {
                await this.prisma.menu.update({
                    where: { id: newMenu.id },
                    data: {
                        slug: `${parent}:${newMenu.id}`
                    },
                });
            } else {
                await this.prisma.menu.update({
                    where: { id: newMenu.id },
                    data: {
                        slug: `${newMenu.id}`
                    },
                });
            }
            return newMenu;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async findAll(): Promise<Menu[]> {
        return await this.prisma.menu.findMany();
    }

    async findMenu(id: number): Promise<Menu> {
        return await this.prisma.menu.findUniqueOrThrow({ where: { id } });
    }

    async updateMenu(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        try {
            const updateMenu = await this.prisma.menu.update({
                where: { id },
                data: {
                    name: updateMenuDto.name,
                    slug: updateMenuDto.slug
                },
            });
            return updateMenu;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    deleteMenu(id: number): Promise<{}> {
        return this.prisma.menu.delete({ where: { id } });
    }
}