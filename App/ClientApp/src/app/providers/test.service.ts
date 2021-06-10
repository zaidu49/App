import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

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
    this.myApiUrl = 'api/Test/';
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getTest(testId: number): Observable<Test> {
    return this.http.get<Test>(this.myAppUrl + this.myApiUrl + testId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveTest(test): Observable<Test> {
    return this.http.post<Test>(this.myAppUrl + this.myApiUrl, JSON.stringify(test), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateTest(testId: number, test): Observable<Test> {
    return this.http.put<Test>(this.myAppUrl + this.myApiUrl + testId, JSON.stringify(test), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTest(testId: number): Observable<Test> {
    return this.http.delete<Test>(this.myAppUrl + this.myApiUrl + testId)
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
