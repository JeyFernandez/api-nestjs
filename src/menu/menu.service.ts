import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name } = createMenuDto;
    
    const menu = this.menuRepository.create({
      name,
    });

    await this.menuRepository.save(menu);

    return menu;
  }

  findAll() {
    return this.menuRepository.find();
  }

  async findOne(id: string) {
    const menu = await this.menuRepository.findOneBy({id});

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async update(id: string, updateMenuDto: CreateMenuDto) {
    const { name } = updateMenuDto;

    const menu = await this.menuRepository.preload({
      id,
      name,
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.menuRepository.save(menu);
  }

  async remove(id: string) {
    const menu = await this.menuRepository.findOneBy({id});

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.menuRepository.remove(menu);
  }
}
