import { FormControl } from '@angular/forms';
export class QuizCard {
  public title: string = null;
  public description: string = null;
  public typeOfSelection = 0;
  // 0 - time limited,
  // 1 - question number limited,
  // 2 - topics limited,
  // 3 - random,
  // 4 - limited time, questions and lives
  public selectionLabel: string = null;
  public selectionList: any[];
  public selectionValues: any[];
  public selectedValue: any = null;
  public themes = new FormControl();
  public constructor(init?: Partial<QuizCard>) {
    Object.assign(this, init);
  }
}
