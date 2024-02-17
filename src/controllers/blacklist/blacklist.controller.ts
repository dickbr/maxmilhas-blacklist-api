import { Blacklist } from "@database/postgres/entities/blacklist.entity";
import { Body, Controller, Get, Post, Query, Param, Delete } from "@nestjs/common";
import { GetBlacklist } from "core/use-cases/blacklist";
import { CreateBlacklist } from "core/use-cases/blacklist/create-blacklist/create-blacklist.use-case";
import { DeleteBlacklist } from "core/use-cases/blacklist/delete-blacklist/delete-blacklist.use-case";
import { ListBlacklist } from "core/use-cases/blacklist/list-blacklist/list-blacklist.use-case";
import { CreateBlacklistRequest } from "dtos/blacklist/create-blacklist.request";

@Controller('cpf')
export class BlacklistController {
  constructor(
    private readonly createBlacklist: CreateBlacklist,
    private readonly listBlacklist: ListBlacklist,
    private readonly getBlacklist: GetBlacklist,
    private readonly deleteBlacklist: DeleteBlacklist,
  ) {}

  @Post()
  create(@Body() body: CreateBlacklistRequest) {
    return this.createBlacklist.execute(body);
  }

  @Get(':cpf')
  get(@Param('cpf') cpf: string) {
    return this.getBlacklist.execute({ cpf });
  }

  @Get()
  list(
    @Query("cpf") cpf: string,
    @Query("page") page: number,
    @Query("per_page") per_page: number,
  ): Promise<{ list: Blacklist[]; count: number }> {
    return this.listBlacklist.execute({ 
      cpf, 
      page: page ? Number(page) : undefined, 
      per_page: per_page ? Number(per_page) : undefined 
    });
  }

  @Delete(':cpf')
  delete(@Param('cpf') cpf: string) {
    return this.deleteBlacklist.execute({ cpf });
  }
}