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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("./entities/client.entity");
const typeorm_2 = require("typeorm");
let ClientsService = class ClientsService {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async create(createClientDto) {
        try {
            const client = this.clienteRepository.create(createClientDto);
            await this.clienteRepository.save(client);
            return client;
        }
        catch (error) {
            throw new Error("Error al crear el cliente, porfa verificar los campos");
        }
    }
    async findAll() {
        try {
            return await this.clienteRepository.find();
        }
        catch (error) {
            throw new Error("Error al obtener la lista de clientes");
        }
    }
    async findOne(id) {
        try {
            const client = await this.clienteRepository.findOneBy({ id });
            if (!client) {
                throw new common_1.NotFoundException(`Cliente con nombre ${client.name} no encontrado`);
            }
            return client;
        }
        catch (error) {
            throw new Error("Error al obtener el cliente");
        }
    }
    async update(id, updateClientDto) {
        try {
            const cliente = await this.findOne(id);
            const update = await this.clienteRepository.merge(cliente, updateClientDto);
            return this.clienteRepository.save(update);
        }
        catch (error) {
            throw new Error("Error al actualizar el cliente");
        }
    }
    async remove(id) {
        try {
            const client = await this.findOne(id);
            await this.clienteRepository.remove(client);
            return `El cliente ${client.name} se ha eliminado correctamente`;
        }
        catch (error) {
            throw new Error("Error al eliminar el cliente");
        }
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map