import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSiderLayoutComponent } from './left-sider-layout.component';

describe('LeftSiderLayoutComponent', () => {
  let component: LeftSiderLayoutComponent;
  let fixture: ComponentFixture<LeftSiderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSiderLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSiderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
