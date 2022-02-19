import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Transfer} from '../../models/transfer.model';
import {TransferType} from '../../models/transferType.enum';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ConfirmType} from '../../../../shared/models/confirmType.enum';
import {TransferService} from '../../../../services/transfer.service';

@Component({
  selector: 'app-transfer-preview',
  templateUrl: './transfer-preview.component.html',
  styleUrls: ['./transfer-preview.component.scss']
})
export class TransferPreviewComponent implements OnInit {

  TransferType = TransferType;

  constructor(private router: Router,
              private transferService: TransferService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<TransferPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public transfer: Transfer) { }

  ngOnInit(): void {
  }

  buildDisplayValue = ( value: number) => {
    return (this.transfer.type === TransferType.Outcome ? '-' : '+') + value;
  }

  navigateToTransferEdit = () => {
    this.router.navigate(['transfer', this.transfer.id]).then(_ => {
      this.closeModal();
    });
  }

  deleteTransfer = () => {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      width: '400px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: {
        message: 'Do you really want to delete this transfer?',
        type: ConfirmType.Danger,
        confirmMessage: 'Yes, delete',
        cancelMessage: 'No, keep'
      }
    });

    dialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.transferService.deleteTransfer(this.transfer.id).subscribe(_ => {
          this.closeModal();
        });
      }
    });
  }

  closeModal = () => {
    this.dialogRef.close();
  }

}
