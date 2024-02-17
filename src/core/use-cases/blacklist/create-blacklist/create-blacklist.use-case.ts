import { Injectable } from '@nestjs/common';
import { Input } from './input';
import { Blacklist } from '@database/postgres/entities/blacklist.entity';
import { ExistsCpfException } from 'core/exceptions/ExistsCpfException';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GetClient } from 'core/use-cases/client';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';

@Injectable()
export class CreateBlacklist {
  constructor(
    private readonly repository: IBlacklistRepository,
    private readonly getClient: GetClient,
  ) {}

  async execute(input: Input): Promise<Blacklist> {
    await validateOrReject(plainToInstance(Input, input));

    const blacklist = await this.repository.find({ cpf: input.cpf }).findOne();

    if (blacklist) {
      throw new ExistsCpfException();
    }

    const client = await this.getClient.execute({ cpf: input.cpf, no_error: true })
    
    return await this.repository.save({...input, client});
    }
}