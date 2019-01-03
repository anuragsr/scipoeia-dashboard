import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkedResults',
  pure: false
})
export class CheckedResultsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(x => { return x.checked })
  }

}
