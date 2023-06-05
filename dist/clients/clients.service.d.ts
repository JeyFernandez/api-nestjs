import { CreateClientDto } from "./dto/create-client.dto";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";
export declare class ClientsService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateClientDto: CreateClientDto): Promise<Client>;
    remove(id: string): Promise<string>;
}
