import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-saved-transfer-filter-edit-modal',
  templateUrl: './saved-transfer-filter-edit-modal.component.html',
  styleUrls: ['./saved-transfer-filter-edit-modal.component.scss']
})
export class SavedTransferFilterEditModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<SavedTransferFilterEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public name: string) { }

  ngOnInit(): void {
  }

  onCancel = () => this.dialog.close();
  onConfirm = () => this.dialog.close(this.name);

}
