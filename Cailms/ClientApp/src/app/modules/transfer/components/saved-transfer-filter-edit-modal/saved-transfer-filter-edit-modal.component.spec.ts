import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTransferFilterEditModalComponent } from './saved-transfer-filter-edit-modal.component';

describe('SavedTransferFilterEditModalComponent', () => {
  let component: SavedTransferFilterEditModalComponent;
  let fixture: ComponentFixture<SavedTransferFilterEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedTransferFilterEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedTransferFilterEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
