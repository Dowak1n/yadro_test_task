import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RatesComponent } from './components/rates/rates.component'
import { CurrencyDiffPipe } from './shared/pipes/data.format.pipe'

@NgModule({
  declarations: [AppComponent, RatesComponent, CurrencyDiffPipe],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
