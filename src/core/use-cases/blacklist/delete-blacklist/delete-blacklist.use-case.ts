import { Injectable } from '@nestjs/common';
import { NotFoundCpfException } from 'core/exceptions/NotFoundCpfException';
import { validateOrReject } from 'class-validator';
import { Input } from './input';
import { plainToInstance } from 'class-transformer';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';

@Injectable()
export class DeleteBlacklist {
  constructor(
   private readonly repository: IBlacklistRepository,
  ){}

   async execute(input: Input): Promise<void> {
    await validateOrReject(plainToInstance(Input, input));

    const blacklist = await this.repository.find({ cpf: input.cpf }).findOne();
 
    if (!blacklist) {
      throw new NotFoundCpfException();
    }

    await this.repository.delete(blacklist);
  }
}