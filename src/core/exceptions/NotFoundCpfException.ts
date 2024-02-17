import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundCpfException extends HttpException {
  constructor() {
    super({
      type: 'NotFoundCpfException',
      message: 'CPF not found.'
    }, HttpStatus.NOT_FOUND);
  }
}