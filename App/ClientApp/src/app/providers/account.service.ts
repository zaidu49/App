import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Authentication/';
  }

  register(userData): Observable<Register> {
    return this.http.post<Register>(this.myAppUrl + this.myApiUrl + "register-user", JSON.stringify(userData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }


  login(credentials) {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "login-user", JSON.stringify(credentials), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  //login(credentials): Observable<Login> {
  //  return this.http.post<Login>(this.myAppUrl + this.myApiUrl + "login-user", JSON.stringify(credentials), this.httpOptions)
  //    .pipe(
  //      retry(1),
  //      catchError(this.errorHandler)
  //    );
  //}


  //register(userData: Register) {
  //  return this.http.post(this.myAppUrl + this.myApiUrl + "register-user", JSON.stringify(userData), this.httpOptions);
  //}


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
