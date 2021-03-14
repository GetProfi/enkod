import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { TABLE_DATA } from '../constant';
import { Record } from '../models/record.model';
import { TableData } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  private tableData: Record[] = TABLE_DATA;

  public getData(first: number = 0, rows?: number): TableData {
    const totalRecords = this.tableData.length;
    const records = this.tableData
      .slice(first)
      .slice(0, rows);

    const data: TableData = {
      records,
      totalRecords,
    };

    return data;
  }

  public getPaginateData(page: number = 1, perPage: number = 5): PaginationResponse<Record> {
    const lastPage = this.tableData.length / perPage;
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
