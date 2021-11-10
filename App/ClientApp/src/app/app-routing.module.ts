import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AddEditTestComponent } from './add-edit-test/add-edit-test.component';
import { AuthGuard } from './auth/auth.guard';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HomeComponent } from './home/home.component';
import { AddEditQuizComponent } from './quiz/add-edit-quiz/add-edit-quiz.component';
import { QuestionListComponent } from './quiz/question-list/question-list.component';
import { QuestionComponent } from './quiz/question/question.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'hero', component: HeroFormComponent },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TestComponent },
  { path: 'add', component: AddEditTestComponent },
  { path: 'test/edit/:id', component: AddEditTestComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'question', component: QuestionComponent },
  { path: 'question/:quizId', component: QuestionComponent },

  { path: 'question/edit/:id', component: QuestionComponent },
  { path: 'question/edit/:id/:quizId', component: QuestionComponent },


 { path: 'question-list', component: QuestionListComponent },

  { path: 'question-list/:quizId', component: QuestionListComponent },

  { path: 'add-edit-quiz', component: AddEditQuizComponent },
  { path: 'quiz/edit/:id', component: AddEditQuizComponent },
  { path: 'quiz-list', component: QuizListComponent },


  //for child routes
  //{
  //  path: 'parent', component: ParentComponent,
  //  children: [
  //    {
  //      path:'childPath', component:ChildComponent
  //    }]
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
