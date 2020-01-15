import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './+views/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { QuizCardsComponent } from './+views/quiz-cards/quiz-cards.component';
import { QuizComponent } from './+views/quiz/quiz.component';
import { RankingsComponent } from './+views/rankings/rankings.component';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { QuizCardComponent } from './+views/quiz-card/quiz-card.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    MainComponent,
    QuizCardsComponent,
    QuizComponent,
    RankingsComponent,
    AppComponent,
    QuizCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
