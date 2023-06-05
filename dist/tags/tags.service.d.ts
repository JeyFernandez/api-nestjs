import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
export declare class TagsService {
    private tagRepository;
    constructor(tagRepository: Repository<Tag>);
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: string): Promise<Tag>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<Tag>;
    remove(id: string): Promise<Tag>;
}
