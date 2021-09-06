import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(tap(data => {
        if (data === undefined) throw new NotFoundException();
      }));
  }
}