import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {TransferType} from '../../models/transferType.enum';
import {Transfer} from '../../models/transfer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrencyExchangeModel} from '../../models/currencyExchange.model';
import {CurrencyExchangeResponse} from '../../models/currencyExchangeResponse.model';
import {CurrencyExchangeModalComponent} from '../currency-exchange-modal/currency-exchange-modal.component';
import {ExternalServicesService} from '../../../../services/externalServices.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {

  @Input() transfer = new Transfer();
  @Input() categoryOptions = [];
  @Input() tagOptions = [];
  @Input() conversionEnabled = true;
  @Input() saveEnabled = true;
  @Output() transferChange = new EventEmitter<Transfer>();
  @Output() createTransfer = new EventEmitter<Transfer>();
  @Output() saveTemplate = new EventEmitter<Transfer>();


  form!: FormGroup;
  category: string;
  IncomeOutcomeType = TransferType;
  type: TransferType;
  tags = [];
  currencyExchangeModel: CurrencyExchangeModel;
  currencyRates: CurrencyExchangeResponse;

  constructor(private formBuilder: FormBuilder,
              private externalServices: ExternalServicesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.formBuilder.group({
      name: [this.transfer.name, [Validators.required]],
      value: [this.transfer.value, [Validators.required]],
      description: [this.transfer.description]
    });
    this.tags = this.transfer.tags;
    this.category = this.transfer.category;
    this.type = this.transfer.type;
  }


  convertButtonClicked = () => {
    const dialogRef = this.dialog.open(CurrencyExchangeModalComponent, {
      autoFocus: false,
      width: '400px',
      backdropClass: 'explicit-overlay-dark-backdrop',
    });

    dialogRef.afterClosed().subscribe(model => {
      this.currencyExchangeModel = model;
      this.currencyExchangeModel.date = this.transfer.date;

      this.updateCurrencyRates();
    });
  }

  updateCurrencyRates = () => {
    this.externalServices.getCurrencyRates(this.currencyExchangeModel).subscribe(response => {
      this.currencyRates = response;
      this.form.get('value').setValue(this.currencyRates.rateForAmount.toFixed(2));
    });
  }

  removeConversion = () => {
    this.currencyExchangeModel = null;
    this.currencyRates = null;
    this.form.get('value').setValue(0);
  }

  isFormEmpty = () => {
    const controls = this.form.controls;
    const emptyValues = [null, ''];
    return !emptyValues.includes(controls.name.value) ||
      !emptyValues.includes(controls.description.value) ||
      controls.value.value !== 0 || this.category != null ||
      this.tags.length !== 0;
  }

  getTransferFromForm = () => {
    return {
      id: this.transfer.id,
      date: this.transfer.date,
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      value: this.form.controls.value.value,
      type: this.type,
      category: this.category,
      tags: this.tags
    };
  }

  saveFormAsTemplate = () => {
    const transfer = this.getTransferFromForm();
    this.saveTemplate.emit(transfer);
  }

  formChanged = () => {
    const transfer = this.getTransferFromForm();
    this.transferChange.emit(transfer);
  }
}
