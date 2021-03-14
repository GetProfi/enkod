import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RecordsState, RecordsStore } from './record.store';

@Injectable({
  providedIn: 'root',
})
export class RecordsQuery extends QueryEntity<RecordsState> {

  constructor(protected store: RecordsStore) {
    super(store);
  }
}
