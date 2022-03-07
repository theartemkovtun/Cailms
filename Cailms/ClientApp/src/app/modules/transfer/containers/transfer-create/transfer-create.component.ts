import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferType} from '../../models/transferType.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransferService} from '../../../../services/transfer.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {SavedTransferFilterEditModalComponent} from '../../components/saved-transfer-filter-edit-modal/saved-transfer-filter-edit-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {CurrencyExchangeModalComponent} from '../../components/currency-exchange-modal/currency-exchange-modal.component';
import {CurrencyExchangeModel} from '../../models/currencyExchange.model';
import {ExternalServicesService} from '../../../../services/externalServices.service';
import {CurrencyExchangeResponse} from '../../models/currencyExchangeResponse.model';
import {TwoStateButtonModel} from '../../../../shared/models/twoStateButtonModel.model';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ConfirmType} from '../../../../shared/models/confirmType.enum';

@Component({
  selector: 'app-transfer-create',
  templateUrl: './transfer-create.component.html',
  styleUrls: ['./transfer-create.component.scss']
})
export class TransferCreateComponent implements OnInit {

  isDataLoaded = false;
  date: Date;
  form!: FormGroup;
  transferId: string;
  category: string;
  IncomeOutcomeType = TransferType;
  type = TransferType.Outcome;
  categoryOptions = ['Personal', 'Food', 'Housing', 'Utilities', 'Entertainment', 'Education'];
  tagsOptions = [];
  tags = [];
  index = 0;
  savedTemplates = [];
  currencyExchangeModel: CurrencyExchangeModel;
  currencyRates: CurrencyExchangeResponse;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private transferService: TransferService,
              private activatedRoute: ActivatedRoute,
              private notification: NzNotificationService,
              private externalServices: ExternalServicesService,
              public dialog: MatDialog) {
    this.transferId = this.activatedRoute.snapshot.params.transferId;
  }

  ngOnInit(): void {
    if (this.transferId != null) {
      this.transferService.getTransfer(this.transferId).subscribe(transfer => {
        this.date = new Date(transfer.date);
        this.form = this.formBuilder.group({
          name: [transfer.name, [Validators.required]],
          value: [transfer.value, [Validators.required]],
          description: [transfer.description]
        });
        this.tags = transfer.tags;
        this.category = transfer.category;
        this.type = transfer.type;
        this.isDataLoaded = true;
      });
    }
    else {
      this.date = new Date();
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        value: [0, [Validators.required]],
        description: [null]
      });
      this.isDataLoaded = true;
    }
    this.updateOptions();
    this.updateTemplates();
  }

  backToStatistics = () => {
    this.router.navigate(['/']);
  }

  createTransfer = () => {
    const transfer = {
      id: this.transferId,
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      value: this.form.controls.value.value,
      date: this.date,
      type: this.type,
      category: this.category,
      tags: this.tags
    };
    if (this.transferId == null) {
      this.transferService.addTransfer(transfer).subscribe(_ => {
        this.notification
          .success(
            'Transfer has been added',
            `${transfer.name} on ${transfer.date.toISOString().slice(0, 10)} for ${transfer.value}`
          );
        this.resetForm();
      });
    }
    else {
      this.transferService.updateTransfer(transfer).subscribe(_ => {
        this.notification
          .success(
            'Transfer has been updated',
            `${transfer.name} on ${transfer.date.toISOString().slice(0, 10)} for ${transfer.value}`
          );
        this.resetForm();
        this.router.navigate(['transfer']);
      });
    }
  }

  resetForm = () => {
    this.form.reset();
    this.category = null;
    this.tags = [];
    this.removeConversion();
    this.unsetTemplates();
  }

  updateOptions = () => {
    this.transferService.getUserCategories().subscribe(categories => this.categoryOptions = [... new Set(categories.map(c => c.value))]);
    this.transferService.getUserTags().subscribe(tags => this.tagsOptions = [... new Set(tags.map(c => c.value))]);
  }

  convertButtonClicked = () => {
    const dialogRef = this.dialog.open(CurrencyExchangeModalComponent, {
      autoFocus: false,
      width: '400px',
      backdropClass: 'explicit-overlay-dark-backdrop',
    });

    dialogRef.afterClosed().subscribe(model => {
      this.currencyExchangeModel = model;
      this.currencyExchangeModel.date = this.date;

      this.updateCurrencyRates();
    });
  }

  updateCurrencyRates = () => {
    this.externalServices.getCurrencyRates(this.currencyExchangeModel).subscribe(response => {
      this.currencyRates = response;
      this.form.get('value').setValue(this.currencyRates.rateForAmount.toFixed(2));
    });
  }


  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.categoryOptions.indexOf(value) === -1) {
      this.categoryOptions = [...this.categoryOptions, input.value || `New item ${this.index++}`];
    }
  }

  removeConversion = () => {
    this.currencyExchangeModel = null;
    this.currencyRates = null;
    this.form.get('value').setValue(0);
  }

  dateChanged = () => {
    if (this.currencyExchangeModel != null) {
      this.currencyExchangeModel.date = this.date;
      this.updateCurrencyRates();
    }
  }

  templateButtonStateChanged = (filter: TwoStateButtonModel) => {
    this.savedTemplates.filter(b => b.label !== filter.label).forEach(b => b.isActive = false);

    if (filter.isActive) {
      this.form = this.formBuilder.group({
        name: [filter.data.name, [Validators.required]],
        value: [filter.data.value, [Validators.required]],
        description: [filter.data.description]
      });
      this.category = filter.data.category;
      this.tags = filter.data.tags;
      this.type = filter.data.type;
    }
    else {
      this.resetForm();
    }
  }

  isTemplateSelected = () => {
    this.savedTemplates.some(b => b.isActive);
  }

  isFormEmpty = () => {
    const controls = this.form.controls;
    const emptyValues = [null, ''];
    return !emptyValues.includes(controls.name.value) || !emptyValues.includes(controls.description.value) || controls.value.value !== 0 || this.category != null || this.tags.length !== 0;
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
        const controls = this.form.controls;
        this.transferService.addTransfersTemplate({
          templateName: name,
          name: controls.name.value,
          description: controls.description.value,
          value: controls.value.value,
          type: this.type,
          category: this.category,
          tags: this.tags
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
