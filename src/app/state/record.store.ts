import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Record } from '../models/record.model';

export interface RecordsState extends EntityState<Record, Record['id']> {
  totalRecords: number;
  first: number;
  rows: number;
}

const createInitialState = (): RecordsState => ({
  totalRecords: 0,
  first: 0,
  rows: 0,
})

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'records',
  idKey: 'id',
  resettable: true,
})
export class RecordsStore extends EntityStore<RecordsState> {
  constructor() {
    super(createInitialState());
  }

  public setRecords(records: Record[]): void {
    this.set(records);
  }

  public setTotalRecords(totalRecords: number): void {
    const currentTotalRecoords = this.getValue().totalRecords;

    if (totalRecords !== currentTotalRecoords) {
      this.update({totalRecords});
    }
  }
}
