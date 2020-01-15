import { Themes } from './../../models/themes.model';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizCard } from './../../models/quiz-card.model';
import { Component, OnInit, Input } from '@angular/core';
import themes from './../../+themes/themes.json';

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

  public questionThemes: { label: string, qId: string, properties: string[] } [] = themes;


  constructor(
    private router: Router
  ) { }

  public combineQuiz(quizCard: QuizCard) {
    this.quiz.title = quizCard.title;
    this.quiz.timeLimited = (quizCard.typeOfSelection === 0) ? true : false;
    if (this.quiz.timeLimited) {
      this.quiz.timeLimit = quizCard.selectedValue;
    }
    this.quiz.questionsNumberLimited = (quizCard.typeOfSelection === 1) ? true : false;
    if (this.quiz.questionsNumberLimited) {
      this.quiz.questionsNumberLimit = quizCard.selectedValue;
    }
    this.quiz.themesLimited = (quizCard.typeOfSelection === 2) ? true : false;

    this.quiz.adventure = (quizCard.typeOfSelection === 3) ? true : false;
    if (this.quiz.adventure) {
      this.quiz.questionsNumberLimited = true;
      this.quiz.questionsNumberLimit = quizCard.selectedValue;
    }
    this.quiz.expert = (quizCard.typeOfSelection === 4) ? true : false;
    if (this.quiz.expert) {
      this.quiz.questionsNumberLimited = true;
      this.quiz.questionsNumberLimit = quizCard.selectedValue;
    }
    this.questionThemes.forEach(theme => {
      this.quiz.themes.push(theme.qId);
    });
    if (this.quiz.themesLimited) {
      this.quiz.themes = quizCard.themes.value;
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
