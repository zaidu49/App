import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient)
  {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Question/';
  }

  getAllQuestions(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.myAppUrl + this.myApiUrl + "getByQuizId/" + quizId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.myAppUrl + this.myApiUrl + questionId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveQuestion(question, quizId: number): Observable<Question> {

    return this.http.post<Question>(this.myAppUrl + this.myApiUrl + quizId, JSON.stringify(question), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateQuestion(questionId: number, question): Observable<Question> {
    return this.http.put<Question>(this.myAppUrl + this.myApiUrl + questionId, JSON.stringify(question), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteQuestion(questionId: number): Observable<Question> {
    return this.http.delete<Question>(this.myAppUrl + this.myApiUrl + questionId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
