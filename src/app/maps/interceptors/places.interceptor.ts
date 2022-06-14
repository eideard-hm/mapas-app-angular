import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { finalize, Observable } from 'rxjs';

import { LoadingService } from '@maps/services';

@Injectable()
export class PlacesInterceptor implements HttpInterceptor {

  constructor(
    private readonly _loadingSvc: LoadingService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loadingSvc.show();

    const cloneRequest = request.clone({
      params: request.params.appendAll({
        language: 'es',
        access_token: environment.accessToken
      })
    })
    return next.handle(cloneRequest)
      .pipe(
        finalize(() => this._loadingSvc.hidden())
      )
  }
}
