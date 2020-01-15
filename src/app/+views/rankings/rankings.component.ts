import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  rightAnswers: number;
  wrongAnswers: number;
  questionTotalNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'deralbert', rightAnswers: 30, wrongAnswers: 0, questionTotalNumber: 30},
  {position: 2, name: 'stallman', rightAnswers: 28, wrongAnswers: 2, questionTotalNumber: 30},
  {position: 3, name: 'hund', rightAnswers: 24, wrongAnswers: 6, questionTotalNumber: 30},
  {position: 4, name: 'HeadHunter', rightAnswers: 20, wrongAnswers: 0, questionTotalNumber: 20},
  {position: 5, name: 'KitKat', rightAnswers: 18, wrongAnswers: 2, questionTotalNumber: 20},
  {position: 6, name: 'mrtwister', rightAnswers: 15, wrongAnswers: 0, questionTotalNumber: 15},
  {position: 7, name: 'Ball', rightAnswers: 12, wrongAnswers: 3, questionTotalNumber: 15},
  {position: 8, name: 'Testman', rightAnswers: 10, wrongAnswers: 5, questionTotalNumber: 15},
  {position: 9, name: 'DeckTheLols', rightAnswers: 8, wrongAnswers: 0, questionTotalNumber: 15},
  {position: 10, name: 'hallihallo', rightAnswers: 5, wrongAnswers: 0, questionTotalNumber: 10},
];

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'right answers', 'wrong answers', 'question total number'];
  dataSource = ELEMENT_DATA;
  constructor(
    private router: Router,
  ) { }

  public navigateToMain() {
    this.router.navigate(['/quizcards'], { state: { mode: 'Time Quiz' } });
  }

  ngOnInit() {
  }

}
