import { Blacklist } from "@database/postgres/entities/blacklist.entity";

export abstract class IBlacklistRepository {
  abstract save(entity: Blacklist): Promise<Blacklist>;
  abstract find(entity?: Partial<Blacklist>): this;
  abstract byTerm(input: {cpf?: string}): this;
  abstract withClient(): this;
  abstract paginate(page?: number, per_page?: number): this;
  abstract findOne(): Promise<Blacklist | null>;
  abstract findMany(): Promise<{ list: Blacklist[]; count: number }>;
  abstract delete(entity: Blacklist): Promise<void>;
} 