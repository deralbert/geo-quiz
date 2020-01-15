import { QuizCard } from './../../models/quiz-card.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Themes } from './../../models/themes.model';
import themes from './../../+themes/themes.json';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.css']
})

export class QuizCardsComponent implements OnInit {

  topics = new FormControl();
  values = Object.keys(Themes);

  quizCards: Array<QuizCard> = [];
  quizCard: QuizCard = new QuizCard();

  public state = '';
  public questionThemes: { label: string, qId: string, properties: string[] } [] = themes;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('NOW');
    console.log(this.questionThemes[0].properties);
    /* Cards */
    let quizCard: QuizCard = new QuizCard();
    quizCard.title = 'Limited Time Quiz';
    quizCard.description = 'Answer as many quiz questions as you can within given time. Correct answers increase the '
      + 'points in the quiz, wrong answers reduce them.';
    quizCard.typeOfSelection = 0;
    quizCard.selectionLabel = 'Select a time for one question';
    quizCard.selectionList = ['15 sec', '30 sec', '1 min', '3 min', '5 min'];
    console.log(quizCard.selectionList );
    quizCard.selectionValues = [15, 30, 60, 180, 300];
    quizCard.selectedValue = 15;
    this.quizCards.push(quizCard);

    quizCard = new QuizCard();
    quizCard.title = 'X Questions Quiz';
    quizCard.description = 'This quiz will ask you a limited number of questions. For each question you have 1 minute. '
      + 'After all questions (right or wrong) the quiz is over.';
    quizCard.typeOfSelection = 1;
    quizCard.selectionLabel = 'Select a number of questions';
    quizCard.selectionList = ['5', '10', '20', '30', '40'];
    quizCard.selectionValues = [5, 10, 20, 30, 40];
    quizCard.selectedValue = 10;
    this.quizCards.push(quizCard);

    quizCard = new QuizCard();
    quizCard.title = 'Expert Quiz';
    quizCard.description = 'Try this sporty quiz - a number of quiz questions with high level of difficulty are waiting '
    + 'for you. ATTENTION: The first wrong answer and the quiz is over for you! For each question you have 1 minute.';
    quizCard.typeOfSelection = 4;
    quizCard.selectionLabel = 'Select a number of questions';
    quizCard.selectionList = ['15', '20', '25', '30'];
    quizCard.selectionValues = [15, 20, 25, 30];
    quizCard.selectedValue = 15;
    this.quizCards.push(quizCard);

    quizCard = new QuizCard();
    quizCard.title = 'Training Quiz';
    quizCard.description = 'In quiz training, you can practice quiz questions with no time limit. You can also select only topics '
    + 'that interest you. You can also determine the number of questions yourself.';
    quizCard.typeOfSelection = 2;
    quizCard.selectionLabel = 'Select themes that interest you';
    quizCard.selectionList = new Array();
    quizCard.selectionValues = new Array();
    this.questionThemes.forEach(theme => {
      quizCard.selectionList.push(theme.label);
      quizCard.selectionValues.push(theme.qId);
    });
    const defaultTheme: any[] = [this.questionThemes[0].qId];
    quizCard.themes.setValue(defaultTheme);
    this.quizCards.push(quizCard);

    quizCard = new QuizCard();
    quizCard.title = 'Adventure Quiz';
    quizCard.description = 'There are a total of 10 levels, at each level 10 questions that are of different difficulty. The '
    + 'higher the level, the more difficult the questions are. You may not answer correctly 5 times.';
    quizCard.typeOfSelection = 3;
    this.quizCards.push(quizCard);
   }

  public navigateToRankings() {
    this.router.navigate(['/rankings']);
  }

  ngOnInit() {
    this.state = window.history.state.alarm;
  }

}
