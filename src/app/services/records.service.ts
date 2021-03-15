import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Record } from '../models/record.model';
import { RecordsStore } from '../state/record.store';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private http: HttpClient,
    private recordsStore: RecordsStore,
  ) { }


  public getData(page: number = 1, perPage: number = 5): void {
    let params = new HttpParams()
      .set('page', page.toString());

    if (perPage) {
      params = params.set('perPage', perPage.toString());
    }
    this.http.get<PaginationResponse<Record>>('', { params })
      .subscribe((response: PaginationResponse<Record>) => {
        this.recordsStore.setState(response);
      })
  }
}
