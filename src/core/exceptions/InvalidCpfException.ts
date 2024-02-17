import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCpfException extends HttpException {
  constructor() {
    super({
      type: 'InvalidCpfException',
      message: 'CPF is not valid.'
    }, HttpStatus.BAD_REQUEST);
  }
}