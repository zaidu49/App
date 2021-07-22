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
    QuestionListComponent
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
  providers: [TestService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
