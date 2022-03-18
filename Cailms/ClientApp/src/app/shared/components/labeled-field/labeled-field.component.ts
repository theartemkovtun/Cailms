import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-labeled-field',
  templateUrl: './labeled-field.component.html',
  styleUrls: ['./labeled-field.component.scss']
})
export class LabeledFieldComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
