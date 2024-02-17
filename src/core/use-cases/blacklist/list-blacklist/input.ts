import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class Input {
  @IsString()
  @IsOptional()
  @Transform( ({ value, obj }) => obj.cpf = value?.replace(/[^0-9]/g, ''))
  cpf?: string

  @IsOptional()
  @IsNumber()
  page?: number

  @IsOptional()
  @IsNumber()
  per_page?: number
}