import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy } from '@angular/core';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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

  public pagination$: Observable<PaginationResponse<unknown>>;

  public records$ = this.recordsQuery.selectAll()
    .pipe(
      tap((records: Record[]) => {
        if (records) {
          this.loading$.next(false);
        }
      })
    );

  public totalRecords$ = this.recordsQuery.select()
    .pipe(map((state: RecordsState) => state.totalRecords))

  public loading$ = new Subject<boolean>();

  public dropdownOptions = [
    {name: '3', code: 3},
    {name: '5', code: 5},
    {name: '10', code: 10},
  ];

  public rows = 5;

  public first = 0;

  private unsub$ = new Subject();

  constructor(
    private recordsService: RecordsService,
    private recordsQuery: RecordsQuery,
    @Inject(RECORDS_PAGINATOR) public paginatorRef: PaginatorPlugin<Record>
  ) {}

  public ngOnInit(): void {
    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap((page: number) => {
        console.log(page, this.rows)
        const reqFn = () => this.recordsService.getPaginateData(page, this.rows);
        return this.paginatorRef.getPage(reqFn);
      }),
      tap(v => console.log(v))
    )
  }

  public ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }

  public loadRecords(event: LazyLoadEvent): void {
    this.loading$.next(true);
    this.recordsService.getData(event.first, event.rows);
  }

  public dropdownChangeHandler(event): void {
    this.rows = event.value;
    this.paginatorRef.refreshCurrentPage();
  }
 }
