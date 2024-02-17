import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlacklistRequest {
  @IsString()
  @IsNotEmpty()
  cpf!: string;
}