import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistsClientException extends HttpException {
  constructor() {
    super({
      type: 'NotExistsClientException',
      message: 'The Client not exists.'
    }, HttpStatus.NOT_FOUND);
  }
}