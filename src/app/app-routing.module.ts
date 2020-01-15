import { QuizCardsComponent } from './+views/quiz-cards/quiz-cards.component';
import { RankingsComponent } from './+views/rankings/rankings.component';
import { QuizComponent } from './+views/quiz/quiz.component';
import { MainComponent } from './+views/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: QuizCardsComponent },
    { path: 'quizcards', component: QuizCardsComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'rankings', component: RankingsComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
