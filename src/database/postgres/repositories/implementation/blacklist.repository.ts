import { Blacklist } from "@database/postgres/entities/blacklist.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { IBlacklistRepository } from "../interface/blacklist-repository.interface";

@Injectable()
export class BlacklistRepository implements IBlacklistRepository{
  constructor(
    @InjectRepository(Blacklist) private readonly repository: Repository<Blacklist>
  ){}

  private query?: SelectQueryBuilder<Blacklist> | undefined;

  async save(entity: Blacklist): Promise<Blacklist>{
    return await this.repository.save(entity);
  }

  find(entity?: Partial<Blacklist>): this{
    this.query = this.repository.createQueryBuilder('blacklist');

    if(entity){
      this.query.where(entity)
    }
    return this;
  }

  byTerm(input: {cpf?: string}): this{
    if(input.cpf){
      this.query?.andWhere('blacklist.cpf ILIKE :cpf', { cpf: `%${input.cpf}%` })
    }
    return this;
  }

  withClient(): this{
    this.query?.leftJoinAndSelect('blacklist.client', 'client')

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
  
  async findOne(): Promise<Blacklist | null>{
    return await this.query?.getOne() as Blacklist | null;
  }

  async findMany(): Promise<{ list: Blacklist[]; count: number }>{
    const [list, count] = await this.query?.getManyAndCount() as [Blacklist[], number];

    return { list, count }
  }

  async delete(entity: Blacklist): Promise<void>{
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