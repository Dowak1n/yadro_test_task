import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RatesComponent } from './components/rates/rates.component'
import { CurrencyDiffPipe } from './shared/pipes/data.format.pipe'
import { InternalApiService } from './shared/services/internalapi.service'
import { CurrencyDataApiService } from './shared/services/currencyDataApi.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, RatesComponent, CurrencyDiffPipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [InternalApiService, CurrencyDataApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
