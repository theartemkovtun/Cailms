import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeModalComponent } from './currency-exchange-modal.component';

describe('CurrencyExchangeModalComponent', () => {
  let component: CurrencyExchangeModalComponent;
  let fixture: ComponentFixture<CurrencyExchangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyExchangeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
