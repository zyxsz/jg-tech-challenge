import { BaseError } from "../exceptions";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { JsonWebTokenError } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";

@Catch(BaseError, JsonWebTokenError)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: BaseError | JsonWebTokenError, host: ArgumentsHost) {
    console.log("EX:", exception);

    if (exception instanceof JsonWebTokenError) {
      return throwError(
        () =>
          new RpcException({
            message: "Invalid JWT Token",
            statusCode: 401,
          })
      );
    }

    if (exception instanceof BaseError) {
      return throwError(
        () =>
          new RpcException({
            message: exception.message,
            statusCode: exception.statusCode,
          })
      );
    }

    return throwError(
      () =>
        new RpcException({
          message: "Internal server error xx01",
          statusCode: 500,
        })
    );
  }
}
