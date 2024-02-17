import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { IsValidCpf } from "core/utils/decorators/cpf-validator.decorator";

export class Input {
  @IsString()
  @IsValidCpf()
  @Transform( ({ value, obj }) => obj.cpf = value?.replace(/[^0-9]/g, ''))
  cpf!: string;

  @IsBoolean()
  @IsOptional()
  no_error?: boolean;
}