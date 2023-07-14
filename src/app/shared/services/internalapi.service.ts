import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiService } from './api.service'

@Injectable()
export class InternalApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, 'website/api')
  }
}
