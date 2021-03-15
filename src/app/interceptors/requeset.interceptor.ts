import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockService } from '../services/mock.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private mockBackend: MockService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = req.params;
    let queryParams = {};

    params.keys().forEach((paramsKey: string) => {
      queryParams = Object.assign(queryParams, {[paramsKey]: params.get(paramsKey)})
    });

    const data = this.mockBackend.getData(queryParams);
    return of(new HttpResponse({status: 200, body: data}))
  }

}
