import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnfersTotalPanelComponent } from './transfers-total-panel.component';

describe('TrasfersTotalPanelComponent', () => {
  let component: TrasnfersTotalPanelComponent;
  let fixture: ComponentFixture<TrasnfersTotalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasnfersTotalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasnfersTotalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
