export class CategoryOutcome {
  category: string;
  spent: number;
  color: string;
  isShown: boolean;

  constructor(category: string, spent: number, color: string) {
    this.category = category;
    this.spent = spent;
    this.color = color;
    this.isShown = true;
  }

}
