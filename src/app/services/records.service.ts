import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Record } from '../models/record.model';
import { TableData } from '../models/response.model';
import { RecordsStore } from '../state/record.store';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private http: HttpClient,
    private recordsStore: RecordsStore,
  ) { }

  public getData(first: number = 0, rows?: number): void {
    let params = new HttpParams()
      .set('first', first.toString());

    if (rows) {
      params = params.set('rows', rows.toString());
    }

    this.http.get<TableData>('', { params })
      .subscribe((response: TableData) => {
        this.recordsStore.setRecords(response.records);
        this.recordsStore.setTotalRecords(response.totalRecords);
      })
  }

  public getPaginateData(page: number = 1, perPage: number = 5): Observable<PaginationResponse<Record>> {
    let params = new HttpParams()
      .set('page', page.toString());

    if (perPage) {
      params = params.set('perPage', perPage.toString());
    }
    return this.http.get<PaginationResponse<Record>>('', {params});
  }
}
