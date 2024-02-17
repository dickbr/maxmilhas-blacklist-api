import { Injectable } from '@nestjs/common';
import { Input } from './input';
import { Blacklist } from '@database/postgres/entities/blacklist.entity';
import { validateOrReject } from 'class-validator';
import { NotFoundCpfException } from 'core/exceptions/NotFoundCpfException';
import { plainToInstance } from 'class-transformer';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';

@Injectable()
export class GetBlacklist {
  constructor(
    private readonly repository: IBlacklistRepository
  ) {}

  async execute(input: Input): Promise<Blacklist> {
    await validateOrReject(plainToInstance(Input, input));

    const blacklist = await this.repository.find({ cpf: input.cpf }).findOne();

    if (!blacklist) {
      throw new NotFoundCpfException();
    }

    return blacklist;
    }
}