import { Injectable } from '@angular/core';
import { EntityState, EntityStore, PaginationResponse, StoreConfig } from '@datorama/akita';
import { Record } from '../models/record.model';

export interface RecordsState extends PaginationResponse<Record> {
}

const createInitialState = (): RecordsState => ({
  currentPage: 0,
  lastPage: 0,
  perPage: 1,
  data: [],
})

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'records',
  resettable: true,
})
export class RecordsStore extends EntityStore<RecordsState> {
  constructor() {
    super(createInitialState());
  }

  public setState(data: RecordsState): void {
    this.update({
      currentPage: data.currentPage,
      data: data.data,
      lastPage: data.lastPage,
      perPage: data.perPage,
    });
  }
}
