import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateClientRequest {
  @IsString()
  @IsNotEmpty()
  cpf!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}