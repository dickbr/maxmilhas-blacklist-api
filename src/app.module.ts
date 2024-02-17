import { TypeOrmModule } from '@nestjs/typeorm';
import "dotenv/config"
import { Module } from '@nestjs/common';
import { CreateBlacklist } from 'core/use-cases/blacklist/create-blacklist/create-blacklist.use-case';
import { Blacklist } from '@database/postgres/entities/blacklist.entity';
import { BlacklistController } from 'controllers/blacklist/blacklist.controller';
import { Client } from '@database/postgres/entities/client.entity';
import { ClientController } from 'controllers/client/client.controller';
import { CreateClient } from 'core/use-cases/client/create-client';
import { GetClient } from 'core/use-cases/client/get-client';
import { DeleteBlacklist, GetBlacklist, ListBlacklist } from 'core/use-cases/blacklist';
import { IBlacklistRepository } from '@database/postgres/repositories/interface/blacklist-repository.interface';
import { BlacklistRepository } from '@database/postgres/repositories/implementation/blacklist.repository';
import { IClientRepository } from '@database/postgres/repositories/interface/client-repository.interface';
import { ClientRepository } from '@database/postgres/repositories/implementation/client.repository';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ''),
      username: process.env.DB_USERNAME ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_DATABASE ,
      schema: process.env.DB_SCHEMA,
      entities: [Blacklist, Client],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Blacklist, 
      Client,
    ]),
  ],
  controllers: [
    BlacklistController,
    ClientController
  ],
  providers: [
    CreateBlacklist, 
    ListBlacklist, 
    DeleteBlacklist,
    GetBlacklist, 
    CreateClient,
    GetClient,
    {
      provide: IBlacklistRepository,
      useClass: BlacklistRepository
    },
    {
      provide: IClientRepository,
      useClass: ClientRepository
    },
  ],
})
export class AppModule {}
