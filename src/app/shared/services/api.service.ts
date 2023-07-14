import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, EMPTY, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export abstract class ApiService {
  protected constructor(
    protected http: HttpClient,
    private baseUrl: string,
    private baseHeader: HttpHeaders = new HttpHeaders()
  ) {}

  get<T>(
    url: string,
    params?: HttpParams,
    responseType = 'json'
  ): Observable<T> {
    return this.intercept<any>(
      this.http.get<any>(this.baseUrl + url, {
        params: params,
        responseType: responseType as 'json',
        headers: this.baseHeader,
      })
    )
  }

  post<T>(url: string, body: object, responseType = 'json'): Observable<T> {
    return this.intercept<any>(
      this.http.post<any>(this.baseUrl + url, body, {
        responseType: responseType as 'json',
        headers: this.baseHeader,
      })
    )
  }

  put<T>(url: string, body: object): Observable<T> {
    return this.intercept<any>(
      this.http.put<any>(this.baseUrl + url, body, {
        headers: this.baseHeader,
      })
    )
  }

  delete<T>(url: string): Observable<T> {
    return this.intercept<any>(
      this.http.delete<any>(this.baseUrl + url, {
        headers: this.baseHeader,
      })
    )
  }

  intercept<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      catchError(error => {
        if (error.status === 401) {
          ApiService.printError(error)
          return EMPTY
        } else if (error.status === 403) {
          return EMPTY
        } else if (error.status === 404) {
          ApiService.printError(error)
          return throwError(error)
        }
        if (error.status === 409) {
          ApiService.printError(error)
          return EMPTY
        } else {
          ApiService.printError(error)
          return throwError(error)
        }
      })
    )
  }

  private static printError(error: any) {
    const errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error'
    console.error(errorMessage)
  }
}
