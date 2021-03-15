import { Pipe, PipeTransform } from '@angular/core';
import { CommonType } from '../models/record.model';

const DATATYPE_MAP = [
  {type: 'boolean', name: 'Логический' },
  {type: 'number', name: 'Число' },
  {type: 'float', name: 'Дробное число' },
  {type: 'text', name: 'Текст' },
  {type: 'datestamp', name: 'Дата' },
  {type: 'timestamp', name: 'Дата и время' },
];

@Pipe({
  name: 'dataType'
})
export class DataTypePipe implements PipeTransform {

  private typeMap = DATATYPE_MAP;

  transform(value: CommonType): string {
    return this.typeMap.find((item) => item.type === value).name || '';
  }
}
