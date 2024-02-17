import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistsCpfException extends HttpException {
  constructor() {
    super({
      type: 'ExistsCpfException',
      message: 'The CPF already exists.'
    }, HttpStatus.CONFLICT);
  }
}