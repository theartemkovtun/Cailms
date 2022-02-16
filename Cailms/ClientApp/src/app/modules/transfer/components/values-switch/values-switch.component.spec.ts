import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesSwitchComponent } from './values-switch.component';

describe('ValuesSwitchComponent', () => {
  let component: ValuesSwitchComponent;
  let fixture: ComponentFixture<ValuesSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
