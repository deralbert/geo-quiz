import { GeoService } from './../../services/geo.service';
import { map } from 'rxjs/operators';
import { SparqlService } from './../../services/sparql.service';
import { Quiz } from './../../models/quiz.model';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import themes from './../../+themes/themes.json';
import { QuizGameModes } from './../../models/quiz-game-modes';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  public quiz: Quiz;
  public questionNumber = 1;
  public totalQuestionNumber = 0;
  public rightAnswers = 0;
  public wrongAnswers = 0;
  public skippedQuestions = 0;
  public quizCompleted = false;
  public quizLoaded = false;
  public currentLevel = 1;
  public lives = 5;
  public questionGenerated = false;
  public questionText: string;
  public questionAnswer: string;
  public answers: any[];
  public currentAnswer: string;
  public radius = 20;

  public questionThemes: { label: string, qId: string, properties: string[] }[] = themes;

  public timeLeft: number;
  interval: any;

  @ViewChild('LostDialog', { static: false }) private LostDialog: SwalComponent;
  @ViewChild('WonDialog', { static: false }) private WonDialog: SwalComponent;
  @ViewChild('QuitQuizDialog', { static: false }) private QuitQuizDialog: SwalComponent;

  constructor(
    private router: Router,
    private sparqlService: SparqlService,
    private geoService: GeoService
  ) {
    if ((window.history.state !== undefined) && (window.history.state.quizData !== undefined)) {
      this.quiz = window.history.state.quizData;
      this.quizLoaded = true;
    }
  }

  ngOnInit() {
    if (this.quiz) {
      this.generateQuestion(this.quiz);
      if (this.quiz.gameMode === QuizGameModes.LimitedTime) {
        this.timeLeft = this.quiz.timeLimit;
        this.startTimer();
      }

      if (this.quiz.gameMode === QuizGameModes.XQUestions) {
        this.totalQuestionNumber = this.quiz.questionsNumberLimit;
        this.timeLeft = this.quiz.timeLimit;
        this.startTimer();
      }

      if (this.quiz.gameMode === QuizGameModes.Expert) {
        this.totalQuestionNumber = this.quiz.questionsNumberLimit;
        this.timeLeft = this.quiz.timeLimit;
        this.startTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  public quitQuiz() {
    if (this.totalQuestionNumber === 0) {
      this.totalQuestionNumber = this.questionNumber;
    }
    if (this.quizLoaded) {
      this.QuitQuizDialog.fire();
    } else {
      this.navigateToMain();
    }

    // punkte auswerten, in die Tabelle eintragen vorschlagen
  }

  public navigateToMain() {
    this.router.navigate(['/quizcards'], { state: { mode: 'Time Quiz' } });
  }

  public startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.quizCompleted = true;
        this.LostDialog.fire();
      }
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this.interval);
  }

  public resetTimer() {
    this.timeLeft = this.quiz.timeLimit;
  }

  public dismissLostDialog() {
    this.LostDialog.dismiss();
  }

  public dismissWonDialog() {
    this.WonDialog.dismiss();
  }

  public dismissQuitQuizDialog() {
    this.QuitQuizDialog.dismiss();
  }

  public answerNoTimer() {
    this.questionGenerated = false;
    if (this.currentAnswer === this.questionAnswer) {
      this.rightAnswers++;
    } else {
      this.wrongAnswers++;
    }
    this.currentAnswer = '';
    // ..
    if (this.questionNumber === this.totalQuestionNumber) {
      this.quizCompleted = true;
      this.WonDialog.fire();
    } else {
      this.generateQuestion(this.quiz);
      this.questionNumber++;
    }
  }

  public answer() {
    this.questionGenerated = false;
    this.stopTimer();
    this.resetTimer();
    if (this.currentAnswer === this.questionAnswer) {
      this.rightAnswers++;
    } else {
      this.wrongAnswers++;
    }
    this.currentAnswer = '';
    if (this.quiz.gameMode === QuizGameModes.Expert) {
      if (this.wrongAnswers > 0) {
        this.quizCompleted = true;
        this.stopTimer();
        this.resetTimer();
        this.LostDialog.fire();
        return;
      }
    }
    if (this.questionNumber === this.totalQuestionNumber) {
      this.quizCompleted = true;
      this.WonDialog.fire();
    } else {
      this.generateQuestion(this.quiz);
      this.questionNumber++;
      this.startTimer();
    }
  }

  public skipQuestion() {
    this.questionGenerated = false;
    this.skippedQuestions++;
    this.stopTimer();
    this.resetTimer();
    if (this.questionNumber === this.totalQuestionNumber) {
      this.quizCompleted = true;
      this.WonDialog.fire();
    } else {
      this.generateQuestion(this.quiz);
      this.questionNumber++;
      this.startTimer();
    }
  }

  public generateQuestion(quiz: Quiz) {
    // tslint:disable-next-line:prefer-const
    let coordinates: any[] = new Array();
    this.geoService.getLocation().subscribe((position: any) => {
      coordinates.push(position.coords.longitude);
      coordinates.push(position.coords.latitude);
      const shuffledThemes = this.shuffle(quiz.themes);
      const randomTheme = shuffledThemes[Math.floor(Math.random() * shuffledThemes.length)];

      let randomRelation;
      this.questionThemes.forEach(questionTheme => {
        if (questionTheme.qId === randomTheme) {
          randomRelation = questionTheme.properties[Math.floor(Math.random() * questionTheme.properties.length)];
        }
      });
      if (randomTheme === 'Q5') {
        this.sparqlService.getNearestPlace(coordinates, this.radius).subscribe((data: any) => {
          if (data.results.bindings.length < 4) {
            this.radius = this.radius + 3;
            this.generateQuestion(quiz);
            return;
          } else {
            const cityQId = data.results.bindings[0].place.value.substr(data.results.bindings[0].place.value.lastIndexOf('/') + 1);
            console.log(randomRelation);
            this.sparqlService.getPersonFrom(cityQId, randomRelation).subscribe((person: any) => {
              this.answers = new Array();
              const fetchedData = this.shuffle(person.results.bindings);
              const randomIndex = Math.floor(Math.random() * (fetchedData.length - 4));
              if (randomRelation === 'P571' || randomRelation === 'P569') {
                for (let index = randomIndex; index < randomIndex + 4; index++) {
                  const date = new Date(fetchedData[index].valueLabel.value);
                  fetchedData[index].valueLabel.value = date.toLocaleDateString();
                }
              }
              this.answers.push(fetchedData[randomIndex].valueLabel.value);
              this.answers.push(fetchedData[randomIndex + 1].valueLabel.value);
              this.answers.push(fetchedData[randomIndex + 2].valueLabel.value);
              this.answers.push(fetchedData[randomIndex + 3].valueLabel.value);
              this.answers = this.answers.filter(this.onlyUniqueValues);
              if (this.answers.length < 4) {
                console.log('generate new');
                this.radius = this.radius + 3;
                this.generateQuestion(quiz);
                return;
              }
              console.log(fetchedData);
              this.questionText = fetchedData[randomIndex].personLabel.value + ': ' + fetchedData[randomIndex].relationLabel.value + '?';
              this.questionAnswer = fetchedData[randomIndex].valueLabel.value;
              this.questionGenerated = true;
            });
          }
        });
      } else {
        this.sparqlService.getPlaceAndPropertyValue(randomTheme, randomRelation, coordinates, this.radius).subscribe((data: any) => {
          console.log('generate new question' + randomTheme + ' ' + randomRelation);
          if (data.results.bindings.length < 4) {
            this.radius = this.radius + 3;
            this.generateQuestion(quiz);
            return;
          } else {
            this.answers = new Array();
            const fetchedData = this.shuffle(data.results.bindings);
            const randomIndex = Math.floor(Math.random() * (fetchedData.length - 4));
            if (randomRelation === 'P571' || randomRelation === 'P569') {
              for (let index = randomIndex; index < randomIndex + 4; index++) {
                const date = new Date(fetchedData[index].valueLabel.value);
                fetchedData[index].valueLabel.value = date.toLocaleDateString();
              }
            }
            this.answers.push(fetchedData[randomIndex].valueLabel.value);
            this.answers.push(fetchedData[randomIndex + 1].valueLabel.value);
            this.answers.push(fetchedData[randomIndex + 2].valueLabel.value);
            this.answers.push(fetchedData[randomIndex + 3].valueLabel.value);
            this.answers = this.answers.filter(this.onlyUniqueValues);
            if (this.answers.length < 4) {
              console.log('generate new');
              this.radius = this.radius + 3;
              this.generateQuestion(quiz);
              return;
            }
            this.questionText = fetchedData[randomIndex].placeLabel.value + ': ' + fetchedData[randomIndex].relationLabel.value + '?';
            this.questionAnswer = fetchedData[randomIndex].valueLabel.value;
            this.questionGenerated = true;
          }
        });
      }
    });
  }

  private onlyUniqueValues(value, index, self) {
    return self.indexOf(value) === index;
  }

  private shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    // I do not know yet how to correctly show the Swal window here.
    // this.showGoBackDialog();
    $event.returnValue = false;
  }
}
