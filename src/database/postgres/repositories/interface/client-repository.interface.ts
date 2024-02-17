import { Client } from "@database/postgres/entities/client.entity";

export abstract class IClientRepository {
  abstract save(entity: Client): Promise<Client>;
  abstract find(entity?: Partial<Client>): this;
  abstract withBlacklist(): this;
  abstract byTerm(input: { cpf?: string; name?: string }): this;
  abstract paginate(page?: number, per_page?: number): this;
  abstract findOne(): Promise<Client | null>;
  abstract findMany(): Promise<{ list: Client[]; count: number }>;
  abstract delete(entity: Client): Promise<void>;
} 