import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clienteRepository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clienteRepository.create(createClientDto);
      await this.clienteRepository.save(client);
      return client;
    } catch (error) {
      throw new Error("Error al crear el cliente, porfa verificar los campos");
    }
  }

  async findAll() {
    try {
      return await this.clienteRepository.find();
    } catch (error) {
      throw new Error("Error al obtener la lista de clientes");
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clienteRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(
          `Cliente con nombre ${client.name} no encontrado`
        );
      }
      return client;
    } catch (error) {
      throw new Error("Error al obtener el cliente");
    }
  }

  async update(id: string, updateClientDto: CreateClientDto) {
    try {
      const cliente = await this.findOne(id);
      const update = await this.clienteRepository.merge(
        cliente,
        updateClientDto
      );
      return this.clienteRepository.save(update);
    } catch (error) {
      throw new Error("Error al actualizar el cliente");
    }
  }

  async remove(id: string) {
    try {
      const client = await this.findOne(id);
      await this.clienteRepository.remove(client);
      return `El cliente ${client.name} se ha eliminado correctamente`;
    } catch (error) {
      throw new Error("Error al eliminar el cliente");
    }
  }
}
