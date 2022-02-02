import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferType} from '../../models/transferType.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransferService} from '../../../../services/transfer.service';

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

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private transferService: TransferService,
              private activatedRoute: ActivatedRoute) {
    this.transferId = this.activatedRoute.snapshot.params.transferId;
  }

  ngOnInit(): void {

    if (this.transferId != null) {
      this.transferService.getTransfer(this.transferId).subscribe(transfer => {
        this.date = transfer.date;
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
        this.resetForm();
      });
    }
    else {
      this.transferService.updateTransfer(transfer).subscribe(_ => {
        this.resetForm();
      });
    }
  }

  resetForm = () => {
    this.form.reset();
    this.category = '';
    this.tags = [];
  }


  updateOptions = () => {
    this.transferService.getUserCategories().subscribe(categories => this.categoryOptions = [... new Set(categories.map(c => c.value))]);
    this.transferService.getUserTags().subscribe(tags => this.tagsOptions = [... new Set(tags.map(c => c.value))]);
  }

  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.categoryOptions.indexOf(value) === -1) {
      this.categoryOptions = [...this.categoryOptions, input.value || `New item ${this.index++}`];
    }
  }
}
