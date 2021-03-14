import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { RecordsQuery } from '../../state/records.query';

export const paginatorPluginFactory = () => {
  const recordsQuery = inject(RecordsQuery);
  return new PaginatorPlugin(recordsQuery)
    .withControls()
    .withRange();
}

export const RECORDS_PAGINATOR = new InjectionToken(
  'RECORDS_PAGINATOR',
  {
    providedIn: 'root',
    factory: paginatorPluginFactory,
  }
);
