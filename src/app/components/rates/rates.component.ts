import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { CurrencyDataApiService } from '../../shared/services/currencyDataApi.service'
import { forkJoin, map } from 'rxjs'

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})
export class RatesComponent implements OnInit {
  currencies: string[] = ['USD', 'EUR', 'GBP']
  additionalCurrencies: string[] = []
  showAdditionalCurrencies = false
  dataLoaded = false
  rates: { [currency: string]: { rate: number; diff: number } } = {}
  currentDate = ''

  constructor(private currencyApi: CurrencyDataApiService) {}

  ngOnInit() {
    this.getCurrentDateTime()
    this.getRates([...this.currencies])
    setInterval(() => {
      this.getRates([...this.currencies, ...this.additionalCurrencies])
    }, 5000)
    setInterval(() => {
      this.getCurrentDateTime()
    }, 1000)
  }

  getCurrentDateTime() {
    this.currentDate = moment().format('YYYY-MM-DD, HH:mm:ss')
  }

  loadAdditionalCurrencies() {
    this.showAdditionalCurrencies = !this.showAdditionalCurrencies

    if (this.showAdditionalCurrencies) {
      this.additionalCurrencies = ['CNY', 'JPY', 'TRY']

      this.additionalCurrencies.forEach(currency => {
        this.rates[currency] = { rate: 0, diff: 0 }
      })
    } else {
      this.additionalCurrencies = []
    }

    const allCurrencies = [...this.currencies, ...this.additionalCurrencies]
    this.getRates(allCurrencies)
  }

  getRates(currencies: string[]) {
    const previousRates = { ...this.rates }
    const sources = currencies.map(currency =>
      this.currencyApi.getRates(currency)
    )
    forkJoin(sources)
      .pipe(
        map(rates =>
          rates.map((element, index) => ({
            rate: element.result,
            currency: currencies[index],
          }))
        )
      )
      .subscribe(response => {
        response.map(result => {
          const rate = result.rate
          const previousRate = previousRates[result.currency]?.rate || 0
          const diff = previousRate === 0 ? 0 : rate - previousRate
          this.rates[result.currency] = { rate, diff }
        })
        this.dataLoaded = true
      })
  }
}
