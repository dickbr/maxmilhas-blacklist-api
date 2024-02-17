import { Injectable } from '@nestjs/common';
import { Client } from '@database/postgres/entities/client.entity';
import { ExistsCpfException } from 'core/exceptions/ExistsCpfException';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Input } from './input';
import { IClientRepository } from '@database/postgres/repositories/interface/client-repository.interface';

@Injectable()
export class CreateClient {
  constructor(
    private readonly repository: IClientRepository
  ) {}

  async execute(input: Input): Promise<Client> {
    await validateOrReject(plainToInstance(Input, input));

    const client = await this.repository.find({ cpf: input.cpf }).findOne();

    if (client) {
      throw new ExistsCpfException();
    }

    return await this.repository.save(input);
  }
}