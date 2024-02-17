import { Injectable } from '@nestjs/common';
import { Blacklist } from '@database/postgres/entities/blacklist.entity';
import { Input } from './input';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';

@Injectable()
export class ListBlacklist {
  constructor(
    private readonly repository: IBlacklistRepository,
  ){}

  async execute(input: Input): Promise<{list: Blacklist[]; count: number}> {
    await validateOrReject(plainToInstance(Input, input));
    return await this.repository
      .find()
      .byTerm({ cpf: input.cpf })
      .paginate(input.page, input.per_page)
      .withClient()
      .findMany();
  }
}