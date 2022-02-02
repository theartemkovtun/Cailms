export class GetTransfersRequest {
  page: number;
  take: number;
  startDate?: Date;
  endDate?: Date;
  categories: Array<string> = [];
  tags: Array<string> = [];

  constructor(page: number, take: number) {
    this.page = page;
    this.take = take;
  }
}
