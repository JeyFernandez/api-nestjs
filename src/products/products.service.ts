import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { tags, categories, ...productData } = createProductDto;

    let tagsModels = [];
    let categoriesModels = [];
    if (createProductDto.tags) {
      tagsModels = await this.tagRepo.find({
        where: { name: In([...createProductDto.tags]) },
      });
    }
    if (createProductDto.categories) {
      categoriesModels = await this.categoryRepo.find({
        where: { name: In([...createProductDto.categories]) },
      });
    }

    const model = this.productRepository.create({
      ...productData,
      categories: categoriesModels,
      tags: tagsModels,
    });
    await this.productRepository.save(model);

    return model;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { tags, categories, ...productData } = updateProductDto;

    let tagsModels = [];
    let categoriesModels = [];
    if (updateProductDto.tags) {
      tagsModels = await this.tagRepo.find({
        where: { name: In([...updateProductDto.tags]) },
      });
    }
    if (updateProductDto.categories) {
      categoriesModels = await this.categoryRepo.find({
        where: { name: In([...updateProductDto.categories]) },
      });
    }

    const product = await this.productRepository.preload({
      id,
      ...productData,
      categories: categoriesModels,
      tags: tagsModels,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productRepository.remove(product);
  }
}
