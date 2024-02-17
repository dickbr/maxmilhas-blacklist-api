import { FakeBlacklistRepository } from '@database/postgres/repositories/fake/blacklist.repository.fake';
import { FakeClientRepository } from '@database/postgres/repositories/fake/client.repository.fake';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';
import { IClientRepository } from '@database/postgres/repositories/interface/client-repository.interface';
import { Test } from '@nestjs/testing';
import { CreateClient, GetClient } from 'core';
import { CreateBlacklist, DeleteBlacklist, GetBlacklist, ListBlacklist } from 'core/use-cases/blacklist';

export const module_mock = async () => {
  return await Test.createTestingModule({
    providers: [
      {
        provide: IBlacklistRepository,
        useClass: FakeBlacklistRepository
      },
      {
        provide: IClientRepository,
        useClass: FakeClientRepository
      },
      CreateBlacklist, 
      ListBlacklist, 
      DeleteBlacklist,
      GetBlacklist, 
      CreateClient,
      GetClient,
    ],
  }).compile()
}