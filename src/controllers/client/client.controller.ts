import { Body, Controller, Get, Post, Query, Param, Delete } from "@nestjs/common";
import { CreateClient } from "core/use-cases/client/create-client";
import { GetClient } from "core/use-cases/client/get-client";
import { CreateClientRequest } from "dtos/client/create-client.request";

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClient: CreateClient,
    private readonly getClient: GetClient,
  ) {}

  @Post()
  create(@Body() body: CreateClientRequest) {
    return this.createClient.execute(body);
  }

  @Get(':cpf')
  get(@Param('cpf') cpf: string) {
    return this.getClient.execute({ cpf });
  }
}