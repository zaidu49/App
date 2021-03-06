import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Quiz/';
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getQuizzesByUser(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.myAppUrl + this.myApiUrl + 'quizzesByUser')
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getQuiz(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.myAppUrl + this.myApiUrl + quizId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveQuiz(quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.myAppUrl + this.myApiUrl, JSON.stringify(quiz), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateQuiz(quizId: number, quiz): Observable<Quiz> {
    return this.http.put<Quiz>(this.myAppUrl + this.myApiUrl + quizId, JSON.stringify(quiz), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteQuiz(quizId: number): Observable<Quiz> {
    return this.http.delete<Quiz>(this.myAppUrl + this.myApiUrl + quizId)
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
