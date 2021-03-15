import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockService } from '../services/mock.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private mockBackend: MockService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = req.params;
    const page = params.has('page')
      ? params.get('page')
      : null;

    const perPage = params.has('perPage')
      ? params.get('perPage')
      : null;

    const data = this.mockBackend.getData(+page, +perPage);
    return of(new HttpResponse({status: 200, body: data}))
  }

}
