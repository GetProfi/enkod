import { state } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { LazyLoadEvent } from 'primeng/api';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { PER_PAGE } from '../../constant';
import { Record } from '../../models/record.model';
import { RecordsService } from '../../services/records.service';
import { RecordsState } from '../../state/record.store';
import { RecordsQuery } from '../../state/records.query';
import { RECORDS_PAGINATOR } from './record.paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnDestroy {

  @Input('paginator')
  public usePaginator = true;

  public pagination$ = this.recordsQuery.select()
    .pipe(tap(() => this.loading$.next(false)));

  public totalRecords$ = this.recordsQuery.select()
    .pipe(map((state: RecordsState) => state.lastPage * state.perPage));

  public totalPage$ = this.recordsQuery.select()
    .pipe(map((state: RecordsState) => state.lastPage));

  public loading$ = new Subject<boolean>();

  public dropdownOptions = PER_PAGE;

  public rows = 5;

  public first = 0;

  private unsub$ = new Subject();

  constructor(
    private recordsService: RecordsService,
    private recordsQuery: RecordsQuery,
    @Inject(RECORDS_PAGINATOR) public paginatorRef: PaginatorPlugin<Record>
  ) {}

  public ngOnInit(): void {
    this.paginatorRef.pageChanges
      .pipe(
        takeUntil(this.unsub$),
        tap(() => this.loading$.next(true)),
        tap((page: number) => this.recordsService.getData(page, this.rows)),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

  public dropdownChangeHandler(event): void {
    this.rows = event.value;
    this.paginatorRef.refreshCurrentPage();
  }
 }
