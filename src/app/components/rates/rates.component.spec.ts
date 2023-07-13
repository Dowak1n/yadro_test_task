import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RatesComponent } from './rates.component'

describe('RatesComponent', () => {
  let component: RatesComponent
  let fixture: ComponentFixture<RatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize currencies', () => {
    expect(component.currencies).toEqual(['USD', 'EUR', 'GBP'])
  })

  it('should initialize additionalCurrencies as empty array', () => {
    expect(component.additionalCurrencies).toEqual([])
  })

  it('should initialize dataLoaded as false', () => {
    expect(component.dataLoaded).toBeFalse()
  })

  it('should initialize rates as an empty object', () => {
    expect(component.rates).toEqual({})
  })

  it('should initialize currentDate', () => {
    expect(component.currentDate).toBeDefined()
  })

  it('should load additional currencies and update rates', () => {
    component.loadAdditionalCurrencies()
    expect(component.additionalCurrencies).toEqual(['CNY', 'JPY', 'TRY'])
    expect(component.rates['CNY']).toEqual({ rate: 0, diff: 0 })
    expect(component.rates['JPY']).toEqual({ rate: 0, diff: 0 })
    expect(component.rates['TRY']).toEqual({ rate: 0, diff: 0 })
  })
})
