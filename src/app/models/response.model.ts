import { Expose, plainToClass, Type } from 'class-transformer';
import { Record } from './record.model';

export class TableData {
  @Expose()
  public totalRecords: number;

  @Expose()
  @Type(() => Record)
  public records: Record[];

  constructor(plain: Partial<TableData>) {
    Object.assign(this, plainToClass(TableData, plain));
  }
}
