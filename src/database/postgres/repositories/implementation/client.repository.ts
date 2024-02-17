import { Client } from "@database/postgres/entities/client.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { IClientRepository } from "../interface/client-repository.interface";

@Injectable()
export class ClientRepository implements IClientRepository{
  constructor(
    @InjectRepository(Client) private readonly repository: Repository<Client>
  ){}

  private query?: SelectQueryBuilder<Client> | undefined;

  async save(entity: Client): Promise<Client>{
    return await this.repository.save(entity);
  }

  find(entity?: Partial<Client>): this{
    this.query = this.repository.createQueryBuilder('client');

    if(entity){
      this.query.where(entity)
    }
    return this;
  }

  byTerm(input: { cpf?: string; name?: string }): this{
    if(input.cpf){
      this.query?.andWhere('client.cpf ILIKE :cpf', { cpf: `%${input.cpf}%` })
    }

    if(input.name){
      this.query?.andWhere('client.name ILIKE :name', { cpf: `%${input.name}%` })
    }
    return this;
  }

  withBlacklist(): this{
    this.query?.leftJoinAndSelect('client.blacklist', 'blacklist')

    return this;
  }

  paginate(page?: number, per_page?: number): this{
    if(page){
      this.query?.offset(page * (per_page ?? 0))
    }

    if(per_page){
      this.query?.limit(per_page)
    }

    return this;
  }
  
  async findOne(): Promise<Client | null>{
    return await this.query?.getOne() as Client | null;
  }

  async findMany(): Promise<{ list: Client[]; count: number }>{
    const [list, count] = await this.query?.getManyAndCount() as [Client[], number];

    return { list, count }
  }

  async delete(entity: Client): Promise<void>{
    await this.repository.delete(entity.id as string);
  }

  printSql(): this{
    console.log({
      query: this.query?.getSql(),
      params: this.query?.getParameters(),
    })

    return this
  }
}