import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

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

    const myHeaders = new Headers()
    myHeaders.append('apikey', 'hbBEnbCnu37Sn535urzroHPuZKjcQPvw')

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    }

    const requests = currencies.map(currency => {
      const url = `https://api.apilayer.com/currency_data/convert?to=RUB&from=${currency}&amount=1`
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          const rate = data.result
          const previousRate = previousRates[currency]?.rate || 0
          const diff = previousRate === 0 ? 0 : rate - previousRate
          this.rates[currency] = { rate, diff }
        })
    })

    Promise.all(requests)
      .then(() => {
        this.dataLoaded = true
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
}
