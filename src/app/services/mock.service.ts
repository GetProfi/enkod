import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { TABLE_DATA } from '../constant';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  private tableData: Record[] = TABLE_DATA;

  public getData(page: number = 1, perPage: number = 5): PaginationResponse<Record> {
    const lastPage = Math.ceil(this.tableData.length / perPage);
    const data = this.tableData
      .slice((page - 1) * perPage)
      .slice(0, perPage);

    return {
      currentPage: page,
      perPage,
      lastPage,
      data,
    };
  }
}
