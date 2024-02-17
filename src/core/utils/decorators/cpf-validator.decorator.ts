// is-valid-cpf.decorator.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { InvalidCpfException } from 'core/exceptions';
import { cpf } from 'cpf-cnpj-validator';

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if(!cpf.isValid(value)){
            throw new InvalidCpfException();
          }
          return typeof value === 'string' && cpf.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'CPF is not valid.';
        },
      },
    });
  };
}