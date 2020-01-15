export class Quiz {
  public title: string = null;
  public questionsNumberLimited = false;
  public questionsNumberLimit = 0;
  public timeLimited = false;
  public timeLimit = 60;
  public themesLimited = false;
  public adventure = false;
  public expert = false;
  public themes: string[] = [];
  public constructor(init?: Partial<Quiz>) {
    Object.assign(this, init);
  }
}
