import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'currencyDiff',
})
export class CurrencyDiffPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined || Math.abs(value).toFixed(2) === '0.00') {
      return '( 0.00 )'
    } else {
      const formattedValue = Math.abs(value).toFixed(2)
      return value > 0
        ? `↑ ( + ${formattedValue} )`
        : `↓ ( - ${formattedValue} )`
    }
  }
}
