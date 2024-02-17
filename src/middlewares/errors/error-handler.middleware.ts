import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { ErrorHandlerResponse } from './error-handler.response';
import { ExistsCpfException, InvalidCpfException, NotFoundCpfException } from 'core';

@Catch(
  InvalidCpfException,
  NotFoundCpfException,
  ExistsCpfException
)
export class ErrorHandlerMiddleware implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus() ?? 500;
    
    const error: ErrorHandlerResponse = {
      type: exception.constructor.name,
      message: status === 500 ? 'Internal Server Error' : exception.message,
    }

    reply.status(status).send(error)
  }
}