import {ConfirmModalType} from './confirmModalType.modal';

export class ConfirmModal {

  constructor(message: string, type: ConfirmModalType, confirmMessage: string, cancelMessage: string) {
    this.message = message;
    this.type = type;
    this.confirmMessage = confirmMessage;
    this.cancelMessage = cancelMessage;
  }

  message: string;
  type: ConfirmModalType;
  confirmMessage: string;
  cancelMessage: string;
}
