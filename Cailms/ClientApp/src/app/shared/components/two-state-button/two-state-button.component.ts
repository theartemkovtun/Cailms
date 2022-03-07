import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TwoStateButtonModel} from '../../models/twoStateButtonModel.model';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'app-two-state-button',
  templateUrl: './two-state-button.component.html',
  styleUrls: ['./two-state-button.component.scss']
})
export class TwoStateButtonComponent implements OnInit {

  @Input() model = new TwoStateButtonModel();
  @Output() stateChanged = new EventEmitter<TwoStateButtonModel>();
  @Output() renameClicked = new EventEmitter<TwoStateButtonModel>();
  @Output() deleteClicked = new EventEmitter<TwoStateButtonModel>();

  constructor(private nzContextMenuService: NzContextMenuService) { }

  ngOnInit(): void {
  }

  toggleState = () => {
    this.model.isActive = !this.model.isActive;
    this.stateChanged.emit(this.model);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  rename = () => {
    this.renameClicked.emit(this.model);
  }

  delete = () => {
    this.deleteClicked.emit(this.model);
  }
}
