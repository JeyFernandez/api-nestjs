"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("../tags/entities/tag.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let ProductsService = class ProductsService {
    constructor(productRepository, tagRepo, categoryRepo) {
        this.productRepository = productRepository;
        this.tagRepo = tagRepo;
        this.categoryRepo = categoryRepo;
    }
    async create(createProductDto) {
        const { tags, categories } = createProductDto, productData = __rest(createProductDto, ["tags", "categories"]);
        let tagsModels = [];
        let categoriesModels = [];
        if (createProductDto.tags) {
            tagsModels = await this.tagRepo.find({
                where: { name: (0, typeorm_2.In)([...createProductDto.tags]) },
            });
        }
        if (createProductDto.categories) {
            categoriesModels = await this.categoryRepo.find({
                where: { name: (0, typeorm_2.In)([...createProductDto.categories]) },
            });
        }
        const model = this.productRepository.create(Object.assign(Object.assign({}, productData), { categories: categoriesModels, tags: tagsModels }));
        await this.productRepository.save(model);
        return model;
    }
    findAll() {
        return this.productRepository.find();
    }
    findOne(id) {
        return this.productRepository.findOneBy({ id });
    }
    async update(id, updateProductDto) {
        const { tags, categories } = updateProductDto, productData = __rest(updateProductDto, ["tags", "categories"]);
        let tagsModels = [];
        let categoriesModels = [];
        if (updateProductDto.tags) {
            tagsModels = await this.tagRepo.find({
                where: { name: (0, typeorm_2.In)([...updateProductDto.tags]) },
            });
        }
        if (updateProductDto.categories) {
            categoriesModels = await this.categoryRepo.find({
                where: { name: (0, typeorm_2.In)([...updateProductDto.categories]) },
            });
        }
        const product = await this.productRepository.preload(Object.assign(Object.assign({ id }, productData), { categories: categoriesModels, tags: tagsModels }));
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.productRepository.remove(product);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map