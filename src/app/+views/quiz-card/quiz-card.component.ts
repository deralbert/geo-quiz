import { Themes } from './../../models/themes.model';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizCard } from './../../models/quiz-card.model';
import { Component, OnInit, Input } from '@angular/core';
import themes from './../../+themes/themes.json';
import { QuizGameModes } from './../../models/quiz-game-modes';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    style: 'display:block',
  }
})
export class QuizCardComponent implements OnInit {

  @Input() cardClass = '';
  @Input() icon = '';
  @Input() quizCard: QuizCard;

  quiz: Quiz = new Quiz();

  values = Object.keys(Themes);

  public questionThemes: { label: string, qId: string, properties: string[] }[] = themes;


  constructor(
    private router: Router
  ) { }

  public combineQuiz(quizCard: QuizCard) {
    this.quiz.title = quizCard.title;
    this.questionThemes.forEach(theme => {
      this.quiz.themes.push(theme.qId);
    });
    switch (quizCard.gameMode) {
      case QuizGameModes.LimitedTime:
        this.quiz.gameMode = QuizGameModes.LimitedTime;
        this.quiz.timeLimited = true;
        this.quiz.timeLimit = quizCard.selectedValue;
        break;
      case QuizGameModes.XQUestions:
        this.quiz.gameMode = QuizGameModes.XQUestions;
        this.quiz.questionsNumberLimited = true;
        this.quiz.timeLimited = true;
        this.quiz.timeLimit = 60;
        this.quiz.questionsNumberLimit = quizCard.selectedValue;
        break;
      case QuizGameModes.Adventure:
        this.quiz.gameMode = QuizGameModes.Adventure;
        this.quiz.questionsNumberLimit = quizCard.selectedValue;
        break;
      case QuizGameModes.Expert:
        this.quiz.gameMode = QuizGameModes.Expert;
        this.quiz.questionsNumberLimited = true;
        this.quiz.timeLimited = true;
        this.quiz.timeLimit = 60;
        this.quiz.questionsNumberLimit = quizCard.selectedValue;
        break;
      case QuizGameModes.Training:
        this.quiz.themesLimited = true;
        this.quiz.gameMode = QuizGameModes.Training;
        this.quiz.themes = quizCard.themes.value;
        break;
      default:
        break;
    }
    console.log(this.quiz);
    this.navigateToQuiz(this.quiz);
  }

  private navigateToQuiz(quiz: Quiz) {
    this.router.navigate(['/quiz'], { state: { quizData: quiz } });
  }

  ngOnInit() {
  }

}
