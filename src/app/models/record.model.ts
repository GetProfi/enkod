import { Expose, plainToClass, Type } from 'class-transformer';

export type CommonType = 'boolean' | 'number' | 'float' | 'text' | 'datestamp' | 'timestamp';

export class Record {
  @Expose()
  @Type(() => String)
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public systemName: string;

  @Expose()
  public dataType: CommonType;

  @Expose()
  public description?: string;

  constructor(plain: Partial<Record>) {
    Object.assign(this, plainToClass(Record, plain));
  }
}
