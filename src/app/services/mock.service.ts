import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { Record } from '../models/record.model';

const TABLE_DATA: Record[]  = [
  {
    id: '1',
    name: 'dwdwd',
    systemName: 'ddd',
    dataType: 'float',
  },
  {
    id: '2',
    name: 'for create massage',
    systemName: 'for_create_massage',
    dataType: 'number',
  },
  {
    id: '3',
    name: 'text',
    systemName: 'text',
    dataType: 'text',
  },
  {
    id: '4',
    name: 'date_time',
    systemName: 'date_time',
    dataType: 'timestamp',
  },
  {
    id: '5',
    name: 'date',
    systemName: 'date',
    dataType: 'datestamp',
  },
  {
    id: '6',
    name: 'boolean',
    systemName: 'boolean',
    dataType: 'boolean',
  },
  {
    id: '7',
    name: 'dwdwd',
    systemName: 'ddd',
    dataType: 'float',
  },
  {
    id: '8',
    name: 'for create massage',
    systemName: 'for_create_massage',
    dataType: 'number',
  },
  {
    id: '9',
    name: 'text',
    systemName: 'text',
    dataType: 'text',
  },
  {
    id: '10',
    name: 'date_time',
    systemName: 'date_time',
    dataType: 'timestamp',
  },
  {
    id: '11',
    name: 'date',
    systemName: 'date',
    dataType: 'datestamp',
  },
  {
    id: '12',
    name: 'boolean',
    systemName: 'boolean',
    dataType: 'boolean',
  },
];

@Injectable({
  providedIn: 'root'
})
export class MockService {

  private tableData: Record[] = TABLE_DATA;

  public getData(queryParams: any): PaginationResponse<Record> {
    const perPage = queryParams?.perPage || 1;
    const page = queryParams?.page || 5;
    const sortColumn = queryParams?.sortColumn || '';
    const sortOrder = queryParams?.sortOrder || 1;
    const lastPage = Math.ceil(this.tableData.length / perPage);
    let data = this.tableData;

    data = data
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
