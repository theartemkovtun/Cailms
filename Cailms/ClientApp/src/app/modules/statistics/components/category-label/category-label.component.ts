import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryOutcome} from '../../models/categoryOutcome.model';

@Component({
  selector: 'app-category-label',
  templateUrl: './category-label.component.html',
  styleUrls: ['./category-label.component.scss']
})
export class CategoryLabelComponent implements OnInit {

  @Input() category: CategoryOutcome;
  @Output() categoryChange = new EventEmitter<CategoryOutcome>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleState = () => {
    this.category.isShown = !this.category.isShown;
    this.categoryChange.emit(this.category);
  }
}
