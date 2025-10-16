import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

interface Error {
  error: {
    message: string;
    statusCode: number;
  };
}

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message =
      (exception.getError() as Error)?.error?.message ||
      "Internal server error";
    const status: number =
      (exception.getError() as Error)?.error?.statusCode || 500;

    return response.status(status).json({ message, statusCode: status });
  }
}
