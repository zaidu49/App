import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTestComponent } from './add-edit-test/add-edit-test.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './quiz/question/question.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'hero', component: HeroFormComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'add', component: AddEditTestComponent },
  { path: 'test/edit/:id', component: AddEditTestComponent },
  { path: 'question', component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
