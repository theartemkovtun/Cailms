import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-values-line-compare',
  templateUrl: './values-line-compare.component.html',
  styleUrls: ['./values-line-compare.component.scss']
})
export class ValuesLineCompareComponent implements OnInit {

  @Input() first = 0;
  @Input() second = 0;
  @Input() color = '#d9d9d9';

  total: number;
  firstValueLength: number;
  secondValueLength: number;

  constructor() { }

  ngOnInit(): void {
    this.total = this.first + this.second;
    this.firstValueLength = this.first / this.total * 100;
    this.secondValueLength = this.second / this.total * 100;
  }

}
