import { QuizGameModes } from './quiz-game-modes';

export class Quiz {
  public title: string = null;
  public questionsNumberLimited = false;
  public questionsNumberLimit = -1;
  public timeLimited = false;
  public timeLimit = -1;
  public gameMode: QuizGameModes;
  public themesLimited = false;
  public themes: string[] = [];
  public constructor(init?: Partial<Quiz>) {
    Object.assign(this, init);
  }
}
