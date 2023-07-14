import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Rate } from '../model/rate.model'

@Injectable()
export class CurrencyDataApiService extends ApiService {
  constructor(http: HttpClient) {
    const headers = new HttpHeaders().set(
      'apikey',
      '0SKZyH00tNBRXi3Z2fAsWfxd44poNme2'
    )
    super(http, 'https://api.apilayer.com/currency_data/', headers)
  }

  getRates(currency: string): Observable<Rate> {
    return this.get<Rate>(`convert?to=RUB&from=${currency}&amount=1`)
  }
}
