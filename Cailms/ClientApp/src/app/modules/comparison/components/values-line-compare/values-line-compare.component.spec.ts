import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesLineCompareComponent } from './values-line-compare.component';

describe('ValuesLineCompareComponent', () => {
  let component: ValuesLineCompareComponent;
  let fixture: ComponentFixture<ValuesLineCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesLineCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesLineCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
