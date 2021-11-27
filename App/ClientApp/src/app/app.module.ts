import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { TestComponent } from './test/test.component';
import { TestService } from './providers/test.service';
import { AppRoutingModule } from './app-routing.module';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { AddEditTestComponent } from './add-edit-test/add-edit-test.component';
import { QuestionComponent } from './quiz/question/question.component';
import { QuestionService } from './providers/question.service';
import { QuestionListComponent } from './quiz/question-list/question-list.component';
import { AddEditQuizComponent } from './quiz/add-edit-quiz/add-edit-quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizService } from './providers/quiz.service';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { AccountService } from './providers/account.service';
import { AuthInterceptor } from './providers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HeroFormComponent,
    TestComponent,
    TestDetailComponent,
    AddEditTestComponent,
    QuestionComponent,
    QuestionListComponent,
    AddEditQuizComponent,
    QuizListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //RouterModule.forRoot([
    
    //])
  ],
  providers: [
    TestService,
    QuestionService,
    QuizService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
