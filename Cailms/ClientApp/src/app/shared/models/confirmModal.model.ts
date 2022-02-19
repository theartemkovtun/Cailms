import {ConfirmType} from './confirmType.enum';

export class ConfirmModal {

  constructor(message: string, type: ConfirmType, confirmMessage: string, cancelMessage: string) {
    this.message = message;
    this.type = type;
    this.confirmMessage = confirmMessage;
    this.cancelMessage = cancelMessage;
  }

  message: string;
  type: ConfirmType;
  confirmMessage: string;
  cancelMessage: string;
}
