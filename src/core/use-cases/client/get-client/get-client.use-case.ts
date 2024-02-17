import { Injectable } from '@nestjs/common';
import { Input } from './input';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Client } from '@database/postgres/entities/client.entity';
import { NotExistsClientException } from 'core/exceptions/NotExistsClientException';
import { IClientRepository } from '@database/postgres/repositories/interface/client-repository.interface';

@Injectable()
export class GetClient {
  constructor(
    private readonly repository: IClientRepository
  ) {}

  async execute(input: Input): Promise<Client | undefined> {
    await validateOrReject(plainToInstance(Input, input));

    const client = await this.repository.find({ cpf: input.cpf }).findOne();

    if (!client && !input.no_error) {
      throw new NotExistsClientException();
    }

    return client ?? undefined;
  }
}