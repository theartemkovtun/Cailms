import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TransferService} from '../../../../services/transfer.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {SavedTransferFilterEditModalComponent} from '../../components/saved-transfer-filter-edit-modal/saved-transfer-filter-edit-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {TwoStateButtonModel} from '../../../../shared/models/twoStateButtonModel.model';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ConfirmType} from '../../../../shared/models/confirmType.enum';
import {Transfer} from '../../models/transfer.model';
import {TransferType} from '../../models/transferType.enum';

@Component({
  selector: 'app-transfer-create',
  templateUrl: './transfer-create.component.html',
  styleUrls: ['./transfer-create.component.scss']
})
export class TransferCreateComponent implements OnInit {

  categoryOptions = [];
  tagOptions = [];
  transfer = new Transfer();
  isDataLoaded = false;
  transferId: string;
  index = 0;
  savedTemplates = [];

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private transferService: TransferService,
              private activatedRoute: ActivatedRoute,
              private notification: NzNotificationService,
              public dialog: MatDialog) {
    this.transferId = this.activatedRoute.snapshot.params.transferId;
  }

  ngOnInit(): void {
    if (this.transferId != null) {
      this.transferService.getTransfer(this.transferId).subscribe(transfer => {
        this.transfer = transfer;
        this.transfer.date = new Date(this.transfer.date)
      });
    }
    this.isDataLoaded = true;
    this.updateOptions();
    this.updateTemplates();
  }

  createTransfer = () => {
    if (this.transferId == null) {
      this.transferService.addTransfer(this.transfer).subscribe(_ => {
        this.notification
          .success(
            'Transfer has been added',
            `${this.transfer.name} \n on ${this.transfer.date.toString().slice(0, 10)} for ${this.transfer.value}`
          );
        this.resetForm();
      });
    }
    else {
      this.transferService.updateTransfer(this.transfer).subscribe(_ => {
        this.notification
          .success(
            'Transfer has been updated',
            `${this.transfer.name} on ${this.transfer.date.toString().slice(0, 10)} for ${this.transfer.value}`
          );
        this.resetForm();
        this.router.navigate(['transfer']);
      });
    }
  }

  resetForm = () => {
    this.transfer = new Transfer();
    this.unsetTemplates();
  }

  updateOptions = () => {
    this.transferService.getUserCategories().subscribe(categories => this.categoryOptions = [... new Set(categories.map(c => c.value))]);
    this.transferService.getUserTags().subscribe(tags => this.tagOptions = [... new Set(tags.map(c => c.value))]);
  }

  dateChanged = (date: Date) => {}

  templateButtonStateChanged = (filter: TwoStateButtonModel) => {
    this.savedTemplates.filter(b => b.label !== filter.label).forEach(b => b.isActive = false);

    if (filter.isActive) {
      this.transfer = {
        id: null,
        date: this.transfer.date,
        name: filter.data.name,
        value: filter.data.value,
        description: filter.data.description,
        category: filter.data.category,
        tags: filter.data.tags,
        type: filter.data.type
      };
    }
    else {
      this.resetForm();
    }
  }

  isCreateUpdateButtonActive = () => {
    const sharedRequirements = this.transfer.name != null && this.transfer.value !== 0;
    if (this.transfer.type === TransferType.Outcome) {
      return sharedRequirements && this.transfer.category != null;
    }
    return sharedRequirements;
  }

  updateTemplates = () => {
    this.transferService.getUserTransfersTemplates().subscribe(templates => {
      if (templates != null) {
        this.savedTemplates = templates.map(template => {
          return {
            id: template.id,
            label: template.templateName,
            isActive: false,
            data: {
              name: template.name,
              value: template.value,
              description: template.description,
              type: template.type,
              category: template.category,
              tags: template.tags
            }
          };
        });
      }
      else {
        this.savedTemplates = [];
      }
    });
  }

  saveTemplate = () => {
    const dialogRef = this.dialog.open(SavedTransferFilterEditModalComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name != null) {
        this.transferService.addTransfersTemplate({
          templateName: name,
          name: this.transfer.name,
          description: this.transfer.description,
          value: this.transfer.value,
          type: this.transfer.type,
          category: this.transfer.category,
          tags: this.transfer.tags
        }).subscribe(_ => this.updateTemplates());
      }
    });
  }

  renameTemplate = (model: TwoStateButtonModel) => {
    const dialogRef = this.dialog.open(SavedTransferFilterEditModalComponent, {
      autoFocus: false,
      width: '600px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: model.label
    });

    dialogRef.afterClosed().subscribe(name => {
      this.transferService.renameTransfersTemplate(model.id, name).subscribe(_ => this.updateTemplates());
    });
  }

  deleteTemplate = (model: TwoStateButtonModel) => {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      width: '400px',
      backdropClass: 'explicit-overlay-dark-backdrop',
      data: {
        message: 'Do you really want to delete this template?',
        type: ConfirmType.Danger,
        confirmMessage: 'Yes, delete',
        cancelMessage: 'No, keep'
      }
    });

    dialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.transferService.deleteTransfersTemplate(model.id).subscribe(_ => {
          this.updateTemplates();
        });
      }
    });
  }

  unsetTemplates = () => {
    this.savedTemplates.forEach(t => t.isActive = false);
  }
}
