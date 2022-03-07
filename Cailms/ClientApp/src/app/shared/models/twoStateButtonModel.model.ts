export class TwoStateButtonModel {
  id: string;
  label: string;
  isActive: boolean;
  data: any;


  constructor(label: string = '', isActive: boolean = false, data: any = null) {
    this.id = null;
    this.label = label;
    this.isActive = isActive;
    this.data = data;
  }
}
