import { FormControl } from '@angular/forms';
import { QuizGameModes } from './quiz-game-modes';
export class QuizCard {
  public title: string = null;
  public description: string = null;
  public selection = false;
  public gameMode: QuizGameModes;
  public selectionLabel: string = null;
  public selectionList: any[]; // Values for foreground
  public selectionValues: any[]; // Values for background
  public selectedValue: any = null;
  public themes = new FormControl();
  public constructor(init?: Partial<QuizCard>) {
    Object.assign(this, init);
  }
}
