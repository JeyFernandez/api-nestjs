import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
export declare class MenuService {
    private menuRepository;
    constructor(menuRepository: Repository<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findOne(id: string): Promise<Menu>;
    update(id: string, updateMenuDto: CreateMenuDto): Promise<Menu>;
    remove(id: string): Promise<Menu>;
}
